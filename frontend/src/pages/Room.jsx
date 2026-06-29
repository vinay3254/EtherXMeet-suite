// frontend/src/pages/Room.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import etherxLogo from '../assets/etherx_transparent.png';
import { fadeIn } from '../utils/animationVariants';
import { ROUTES } from '../utils/constants';
import apiClient from '../utils/apiClient';
import '../styles/room.css';

function getMimeType() {
  const types = [
    'video/webm;codecs=vp9,opus',
    'video/webm;codecs=vp8,opus',
    'video/webm',
    'video/mp4',
  ];
  return types.find((t) => MediaRecorder.isTypeSupported(t)) ?? 'video/webm';
}

export default function Room() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [uploadingRec, setUploadingRec] = useState(false);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const recordStartRef = useRef(null);

  const isHost = sessionStorage.getItem('etherx_host_room') === code;

  useEffect(() => {
    document.title = `Meeting · ${code}`;
  }, [code]);

  // Instant navigation when Jitsi fires hangup / readyToClose
  useEffect(() => {
    const onMessage = (e) => {
      try {
        const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
        const evt = data?.event ?? data?.type ?? '';
        if (['readyToClose', 'videoConferenceLeft', 'hangup'].includes(evt)) {
          sessionStorage.removeItem('etherx_host_room');
          sessionStorage.removeItem('etherx_meet_start');
          navigate(ROUTES.DASHBOARD, { replace: true });
        }
      } catch { /* non-JSON messages — ignore */ }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [navigate]);

  const uploadRecording = useCallback(async () => {
    const blob = new Blob(chunksRef.current, { type: 'video/webm' });
    chunksRef.current = [];
    const durationMin = recordStartRef.current
      ? Math.max(1, Math.round((Date.now() - recordStartRef.current) / 60000))
      : 1;
    const form = new FormData();
    form.append('file', blob, `${code}-${Date.now()}.webm`);
    form.append('roomCode', code);
    form.append('duration', String(durationMin));
    setUploadingRec(true);
    try {
      await apiClient.post('/api/recordings/upload', form);
    } catch {
      // upload failed silently
    } finally {
      setUploadingRec(false);
    }
  }, [code]);

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
      chunksRef.current = [];
      recordStartRef.current = Date.now();
      const mimeType = getMimeType();
      const mr = new MediaRecorder(stream, { mimeType });
      mr.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      mr.onstop = uploadRecording;
      mr.start(1000);
      mediaRecorderRef.current = mr;
      setIsRecording(true);
      stream.getVideoTracks()[0].addEventListener('ended', () => {
        if (mediaRecorderRef.current?.state === 'recording') {
          mediaRecorderRef.current.stop();
          setIsRecording(false);
        }
      });
    } catch { /* user cancelled or permission denied */ }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current?.state === 'recording') mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  return (
    <div className="etherx-room-wrap">
      {/* Logo overlay */}
      <motion.div
        className="etherx-room-logo"
        role="img"
        aria-label="EtherX Meet logo"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <img src={etherxLogo} alt="EtherX Meet" />
      </motion.div>

      {/* Record button — top right, host only */}
      {isHost && (
        <button
          onClick={isRecording ? handleStopRecording : handleStartRecording}
          disabled={uploadingRec}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 20,
            background: isRecording ? 'rgba(234,67,53,0.12)' : 'rgba(0,0,0,0.55)',
            border: isRecording
              ? '1px solid rgba(234,67,53,0.45)'
              : '1px solid rgba(255,255,255,0.12)',
            color: isRecording ? '#f87171' : 'rgba(255,255,255,0.75)',
            borderRadius: 8,
            padding: '8px 16px',
            fontSize: 12,
            fontWeight: 600,
            cursor: uploadingRec ? 'wait' : 'pointer',
            fontFamily: 'Inter, system-ui, sans-serif',
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            letterSpacing: '0.01em',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.15s ease',
            opacity: uploadingRec ? 0.5 : 1,
          }}
        >
          <span style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: isRecording ? '#f87171' : 'rgba(255,255,255,0.5)',
            flexShrink: 0,
            animation: isRecording ? 'pulse 1.2s ease-in-out infinite' : 'none',
          }} />
          {uploadingRec ? 'Uploading…' : isRecording ? 'Stop' : 'Record'}
        </button>
      )}



      {/* Jitsi meeting iframe */}
      <iframe
        src={`https://8x8.vc/vpaas-magic-cookie-a390c03ef55e457ebeb88a41bdb4af08/${code}`}
        style={{ width: '100vw', height: '100vh', border: 'none', display: 'block' }}
        allow="camera; microphone; fullscreen; display-capture; autoplay"
        allowFullScreen
      />

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
