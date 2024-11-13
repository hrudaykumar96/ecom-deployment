import React from 'react';

const Footer = React.memo(() => {
    return (
        <footer className="bg-body-tertiary text-center">
            <div className="container p-4 pb-0">
                <section className="mb-4">
                    <a
                        data-mdb-ripple-init
                        className="btn text-white btn-floating m-1"
                        style={{ backgroundColor: '#3b5998' }}
                        href="#!"
                        role="button"
                        aria-label="Facebook"
                    >
                        <i className="fab fa-facebook-f"></i>
                    </a>

                    <a
                        data-mdb-ripple-init
                        className="btn text-white btn-floating m-1"
                        style={{ backgroundColor: '#55acee' }}
                        href="#!"
                        role="button"
                        aria-label="Twitter"
                    >
                        <i className="fab fa-twitter"></i>
                    </a>

                    <a
                        data-mdb-ripple-init
                        className="btn text-white btn-floating m-1"
                        style={{ backgroundColor: '#dd4b39' }}
                        href="#!"
                        role="button"
                        aria-label="Google"
                    >
                        <i className="fab fa-google"></i>
                    </a>

                    <a
                        data-mdb-ripple-init
                        className="btn text-white btn-floating m-1"
                        style={{ backgroundColor: '#ac2bac' }}
                        href="#!"
                        role="button"
                        aria-label="Instagram"
                    >
                        <i className="fab fa-instagram"></i>
                    </a>

                    <a
                        data-mdb-ripple-init
                        className="btn text-white btn-floating m-1"
                        style={{ backgroundColor: '#0082ca' }}
                        href="#!"
                        role="button"
                        aria-label="LinkedIn"
                    >
                        <i className="fab fa-linkedin-in"></i>
                    </a>

                    <a
                        data-mdb-ripple-init
                        className="btn text-white btn-floating m-1"
                        style={{ backgroundColor: '#333333' }}
                        href="#!"
                        role="button"
                        aria-label="GitHub"
                    >
                        <i className="fab fa-github"></i>
                    </a>
                </section>
            </div>

            <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                CopyRight © All Rights Reserved                
            </div>
        </footer>
    );
});

Footer.displayName = 'Footer';

export default Footer;