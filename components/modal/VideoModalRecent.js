import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Video.module.css';
import { server } from '../../lib/config';
import Share from '../share';
import Meta from '../meta';
import { generateVParam } from '../../pages/lectures/[pid]';

export default function VideoModalRecent({ isOpen, onClose, videoId, title, description }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }

        const handleEscKey = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscKey);
        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        e.stopPropagation();
    };

    const videoUrl = `/lectures/UUWsdcrre0WbCWML_PnuzoAg?v=${generateVParam(videoId, title)}`;

    const YouTubeIcon = () => (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <Meta
                        title={title || 'Video'}
                        description={description || 'Watch this video from Sheikh Assim Al Hakeem.'}
                        url={`${server}/lectures?v=${videoId}`}
                        image={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                        type="video.other"
                    />
                    
                    <motion.section 
                        className={styles.modalWrapper}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={handleOverlayClick}
                    >
                        {/* Mobile Close Button - Fixed to screen */}
                        <span 
                            className={styles.closeMobile} 
                            onClick={onClose}
                            role="button"
                            tabIndex={0}
                            aria-label="Close video"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    onClose();
                                }
                            }}
                        />
                        
                        <div className={styles.overlay}>
                            <motion.div
                                className={styles.content}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Desktop Close Button - Half inside/outside iframe */}
                                <span 
                                    className={styles.closeDesktop} 
                                    onClick={onClose}
                                    role="button"
                                    tabIndex={0}
                                    aria-label="Close video"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            onClose();
                                        }
                                    }}
                                />
                                
                                <div className={styles.iframeContainer}>
                                    <iframe
                                        className={styles.iframe}
                                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&rel=0&modestbranding=1&controls=1&disablekb=1&enablejsapi=0&iv_load_policy=3`}
                                        title={title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen={false}
                                        loading="lazy"
                                        sandbox="allow-scripts allow-same-origin allow-presentation"
                                    />
                                    
                                    <div className={styles.youtubeIndicator}>
                                        <YouTubeIcon />
                                        <span>YouTube</span>
                                    </div>
                                </div>
                                
                                <div className={styles.details}>
                                    <h2 className={styles.title}>{title}</h2>
                                    <div className={styles.share}>
                                        <Share
                                            urlWeb={videoUrl}
                                            urlMobile={videoUrl}
                                            title={title}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.section>
                </>
            )}
        </AnimatePresence>
    );
}
