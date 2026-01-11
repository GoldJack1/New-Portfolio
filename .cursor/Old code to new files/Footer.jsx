import React from 'react';
import { Link } from 'react-router-dom';
import SocialMediaIcons from '../SocialMediaIcons';
import { FONT_WEIGHTS } from '../../constants/fontWeights';

export default function Footer() {
  const mainPagesLinks = [
    { to: '/', label: 'Home' },
    { to: '/projects', label: 'Projects' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  const otherLinks = [
    { to: '/privacy', label: 'Privacy Policy' },
    { to: '/sitedesign', label: 'Site Design' },
    { to: '/sitemap', label: 'Site Map' },
  ];

  return (
    <footer className="footer">
      <div className="footer-padding-align" style={{
        boxSizing: 'border-box',
        padding: '40px 30px',
        width: '100%',
        maxWidth: '100%',
      }}>
        <div className="footer-content-wrapper" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0px',
          width: '100%',
          maxWidth: '100%',
        }}>
          {/* Top Row - Name/Copyright and Social Icons */}
          <div className="footer-top-row" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            width: '100%',
            marginBottom: '40px',
          }}>
            {/* Left Group - Name and Copyright */}
            <div className="footer-branding-group" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '8px',
            }}>
              <div className="footer-name" style={{
                color: '#fff',
                fontFamily: "'Geologica', sans-serif",
                fontSize: '20px',
                fontWeight: FONT_WEIGHTS.regular,
                fontVariationSettings: "'CRSV' 1",
                lineHeight: '1.2',
                margin: 0,
                padding: 0,
              }}>
                Jack Wingate
              </div>
              <div className="footer-copyright" style={{
                color: '#fff',
                fontFamily: "'Geologica', sans-serif",
                fontSize: '16px',
                fontWeight: FONT_WEIGHTS.extralight,
                fontVariationSettings: "'CRSV' 1",
                lineHeight: '1.2',
                margin: 0,
                padding: 0,
              }}>
                © 2026 All Rights Reserved
              </div>
            </div>

            {/* Right Group - Social Media Icons */}
            <div className="footer-social-group" style={{
              display: 'flex',
              alignItems: 'flex-start',
            }}>
              <SocialMediaIcons />
            </div>
          </div>

          {/* Bottom Row - Navigation Links */}
          <div className="footer-nav-row" style={{
            display: 'flex',
            gap: '164px',
            flexWrap: 'nowrap',
            alignItems: 'flex-start',
          }}>
            {/* Main Pages Section */}
            <nav className="footer-nav-section" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}>
              <div className="footer-nav-heading" style={{
                color: 'rgba(255, 255, 255, 0.5)',
                fontFamily: "'Geologica', sans-serif",
                fontSize: '15px',
                fontWeight: FONT_WEIGHTS.regular,
                fontVariationSettings: "'CRSV' 1",
                marginBottom: '8px',
                marginTop: 0,
                padding: 0,
                lineHeight: '1.2',
              }}>
                Main Pages
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                alignItems: 'flex-start',
              }}>
                {mainPagesLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="footer-link"
                    style={{
                      color: '#fff',
                      textDecoration: 'none',
                      fontSize: '11px',
                      fontWeight: FONT_WEIGHTS.thin,
                      fontFamily: "'Geologica', sans-serif",
                      fontVariationSettings: "'CRSV' 1",
                      transition: 'opacity 0.2s',
                      lineHeight: '1.2',
                      margin: 0,
                      padding: 0,
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Other Section */}
            <nav className="footer-nav-section" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}>
              <div className="footer-nav-heading" style={{
                color: 'rgba(255, 255, 255, 0.5)',
                fontFamily: "'Geologica', sans-serif",
                fontSize: '15px',
                fontWeight: FONT_WEIGHTS.regular,
                fontVariationSettings: "'CRSV' 1",
                marginBottom: '8px',
                marginTop: 0,
                padding: 0,
                lineHeight: '1.2',
              }}>
                Other
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                alignItems: 'flex-start',
              }}>
                {otherLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="footer-link"
                    style={{
                      color: '#fff',
                      textDecoration: 'none',
                      fontSize: '11px',
                      fontWeight: FONT_WEIGHTS.thin,
                      fontFamily: "'Geologica', sans-serif",
                      fontVariationSettings: "'CRSV' 1",
                      transition: 'opacity 0.2s',
                      lineHeight: '1.2',
                      margin: 0,
                      padding: 0,
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </div>

      <style>{`
        .footer-content-wrapper {
          display: flex;
          flex-direction: column;
        }
        
        @media (max-width: 900px) {
          .footer-padding-align {
            padding: 40px 20px !important;
          }
          .footer-content-wrapper {
            gap: 2.5rem !important;
          }
          .footer-top-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 2rem !important;
            width: 100% !important;
          }
          .footer-branding-group {
            width: 100%;
          }
          .footer-social-group {
            width: 100%;
          }
          .footer-nav-row {
            flex-direction: column !important;
            gap: 2.5rem !important;
            width: 100% !important;
          }
          .footer-nav-section {
            width: 100%;
          }
        }
      `}</style>
    </footer>
  );
} 