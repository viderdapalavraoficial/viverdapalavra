import { useState, useLayoutEffect, useRef } from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

function LandingPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const navigate = useNavigate()
    const mainRef = useRef(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Hero Animation (Load instantly)
            const tl = gsap.timeline();
            tl.from('.hero-content > *', {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            });

            // 2. Generic Scroll Reveal (Fade Up)
            gsap.utils.toArray('.animate-fade-up').forEach(element => {
                gsap.fromTo(element,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: element,
                            start: "top 85%", // Start when top of element hits 85% of viewport
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });

            // 3. Staggered Cards (Problem, Roadmap, Principles)
            const staggerSections = ['.grid-3', '.roadmap-container', '.principles-grid', '.qualification-grid'];
            staggerSections.forEach(section => {
                gsap.fromTo(section + " > *",
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.2,
                        ease: "back.out(1.7)", // Slight elastic pop
                        scrollTrigger: {
                            trigger: section,
                            start: "top 80%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });

            // 4. Split Layouts (Side entrances)
            gsap.utils.toArray('.split-layout').forEach(layout => {
                const content = layout.querySelector('.split-content');
                const image = layout.querySelector('.split-image-container');

                if (content && image) {
                    gsap.from(content, {
                        x: -50,
                        opacity: 0,
                        duration: 1,
                        scrollTrigger: { trigger: layout, start: "top 75%" }
                    });
                    gsap.from(image, {
                        x: 50, /* rotateY handled by CSS hover, let's keep it simple here */
                        opacity: 0,
                        duration: 1,
                        delay: 0.2,
                        scrollTrigger: { trigger: layout, start: "top 75%" }
                    });
                }
            });

            // 5. Comparison Table (Row by Row sequence)
            const comparisonRows = gsap.utils.toArray('.comparison-table tbody tr');
            if (comparisonRows.length > 0) {
                gsap.fromTo(comparisonRows,
                    { opacity: 0, x: -20 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.5,
                        stagger: 0.1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: '.comparison-table',
                            start: "top 80%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );

                // Highlight cells emphasis
                gsap.fromTo('.highlight-cell',
                    { scale: 0.9, opacity: 0.7 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.4,
                        stagger: 0.1,
                        delay: 0.5, // Wait for rows to appear
                        ease: "back.out(2)",
                        scrollTrigger: {
                            trigger: '.comparison-table',
                            start: "top 80%"
                        }
                    }
                );
            }

        }, mainRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="landing-page" ref={mainRef}>
            <header className="app-header">
                <div className="container nav-wrapper">
                    <a href="/" className="logo">Viver da Palavra</a>

                    <button
                        className="mobile-menu-btn"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        ) : (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="3" y1="12" x2="21" y2="12"></line>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <line x1="3" y1="18" x2="21" y2="18"></line>
                            </svg>
                        )}
                    </button>

                    <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                        <a href="#problema" onClick={() => setIsMenuOpen(false)}>O Problema</a>
                        <a href="#metodo" onClick={() => setIsMenuOpen(false)}>O Método</a>
                        <a href="/login" className="btn btn-nav-login">Entrar</a>
                    </nav>
                </div>
            </header>

            <main>
                {/* 1️⃣ HERO – CONEXÃO IMEDIATA */}
                <section className="hero">
                    <div className="container">
                        <div className="hero-content">
                            <h1>Estudar a Bíblia todos os dias não precisa ser <span>confuso nem cansativo.</span></h1>
                            <p>
                                Uma jornada bíblica moderna, guiada e progressiva para quem deseja viver a Palavra com clareza e constância.
                            </p>
                            <div className="hero-actions">
                                <button onClick={() => navigate('/login')} className="btn btn-premium pulse-effect">Comece sua jornada gratuitamente</button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2️⃣ PROBLEMA REAL (DOR SILENCIOSA) */}
                <section id="problema" className="section bg-light">
                    <div className="container">
                        <div className="text-center mb-4 animate-on-scroll animate-fade-up">
                            <span className="badge-alert">A REALIDADE</span>
                            <h2>Você já tentou manter uma rotina, mas...</h2>
                        </div>
                        <div className="grid-3">
                            <div className="problem-card animate-on-scroll animate-fade-up delay-100 hover-lift">
                                <span className="problem-icon floating-effect">🧭</span>
                                <h3>Não sabia por onde começar</h3>
                                <p>Abria a Bíblia aleatoriamente e se sentia perdido sem um guia claro.</p>
                            </div>
                            <div className="problem-card animate-on-scroll animate-fade-up delay-200 hover-lift">
                                <span className="problem-icon floating-effect">📉</span>
                                <h3>Parava depois de alguns dias</h3>
                                <p>A empolgação inicial passava e a culpa por "falhar" tomava conta.</p>
                            </div>
                            <div className="problem-card animate-on-scroll animate-fade-up delay-300 hover-lift">
                                <span className="problem-icon floating-effect">🧠</span>
                                <h3>Lia, mas não entendia</h3>
                                <p>Textos difíceis e falta de contexto transformavam a leitura em tarefa, não prazer.</p>
                            </div>
                        </div>
                        <div className="text-center mt-4 animate-on-scroll animate-fade-up delay-400">
                            <p className="large-text mt-4">
                                Você não está sozinho. O problema não é falta de fé. <span className="highlight-text">É falta de direção.</span>
                            </p>
                        </div>
                    </div>
                </section>

                {/* 3️⃣ A PROMESSA CLARA (PROPOSTA DE VALOR) */}
                <section className="section">
                    <div className="container">
                        <div className="split-layout">
                            <div className="split-content">
                                <span className="badge">NOSSA PROMESSA</span>
                                <h2>Transforme leitura em vida.</h2>
                                <p className="lead-text">
                                    O Viver da Palavra foi criado para transformar leitura em prática e constância em crescimento espiritual.
                                    Esqueça a fragmentação. Aqui você encontra uma jornada.
                                </p>
                                <ul className="feature-list">
                                    <li className="hover-lift"><strong>Direção Clara:</strong> Saiba exatamente o que ler e por quê.</li>
                                    <li className="hover-lift"><strong>Progresso Real:</strong> Veja sua evolução espiritual visualmente.</li>
                                    <li className="hover-lift"><strong>Aplicação Prática:</strong> Saia da teoria para a vida real.</li>
                                </ul>
                            </div>
                            <div className="split-image-container">
                                <img
                                    src="/foto1.png"
                                    alt="Interface da Plataforma Viver da Palavra"
                                    className="split-image-real"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4️⃣ COMO FUNCIONA (ROADMAP) */}
                <section id="metodo" className="section bg-light">
                    <div className="container text-center">
                        <span className="badge">O PROCESSO</span>
                        <h2>Como funciona sua jornada</h2>

                        <div className="roadmap-container">
                            <div className="roadmap-step">
                                <div className="step-circle">1</div>
                                <div className="step-content">
                                    <h3>Comece do seu nível</h3>
                                    <p>Planos adaptados para iniciantes e avançados.</p>
                                </div>
                            </div>
                            <div className="roadmap-step">
                                <div className="step-circle">2</div>
                                <div className="step-content">
                                    <h3>Estude com orientação</h3>
                                    <p>Briefings de contexto e explicações claras.</p>
                                </div>
                            </div>
                            <div className="roadmap-step">
                                <div className="step-circle">3</div>
                                <div className="step-content">
                                    <h3>Acompanhe o progresso</h3>
                                    <p>Veja sua 'Árvore da Vida' crescer com a constância.</p>
                                </div>
                            </div>
                        </div>

                        <button onClick={() => navigate('/login')} className="btn btn-primary animate-on-scroll animate-scale delay-400 mt-4">Começar agora</button>
                    </div>
                </section>

                {/* 5️⃣ DIFERENCIAL (COMPARAÇÃO) */}
                <section className="section">
                    <div className="container">
                        <div className="text-center mb-4 animate-on-scroll animate-fade-up">
                            <h2>Por que somos diferentes?</h2>
                        </div>
                        <div className="comparison-container animate-on-scroll">
                            {/* Refactored Comparison Structure - No Tables */}
                            <div className="comparison-wrapper">
                                {/* Desktop Header */}
                                <div className="comparison-header">
                                    <div className="ch-col">Outros Apps</div>
                                    <div className="ch-col brand">Viver da Palavra</div>
                                </div>

                                {/* Rows */}
                                <div className="comparison-row">
                                    <div className="c-card other">
                                        <span className="m-label">Outros Apps</span>
                                        <p>Leitura solta e aleatória</p>
                                    </div>
                                    <div className="c-card us">
                                        <span className="m-label">Viver da Palavra</span>
                                        <p>✨ Jornada guiada e sequencial</p>
                                    </div>
                                </div>

                                <div className="comparison-row">
                                    <div className="c-card other">
                                        <span className="m-label">Outros Apps</span>
                                        <p>Sensação de estar perdido</p>
                                    </div>
                                    <div className="c-card us">
                                        <span className="m-label">Viver da Palavra</span>
                                        <p>✨ Progresso espiritual visual</p>
                                    </div>
                                </div>

                                <div className="comparison-row">
                                    <div className="c-card other">
                                        <span className="m-label">Outros Apps</span>
                                        <p>Conteúdo genérico</p>
                                    </div>
                                    <div className="c-card us">
                                        <span className="m-label">Viver da Palavra</span>
                                        <p>✨ Estudo contextualizado (Grego/Hebraico)</p>
                                    </div>
                                </div>

                                <div className="comparison-row">
                                    <div className="c-card other">
                                        <span className="m-label">Outros Apps</span>
                                        <p>Foco em quantidade (versículos lidos)</p>
                                    </div>
                                    <div className="c-card us">
                                        <span className="m-label">Viver da Palavra</span>
                                        <p>✨ Foco em transformação (vida mudada)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                {/* 7️⃣ PARA QUEM É (QUALIFICAÇÃO) */}
                <section className="section bg-light">
                    <div className="container">
                        <h2 className="text-center mb-4 animate-on-scroll animate-fade-up">Essa jornada é para você?</h2>
                        <div className="qualification-grid">
                            <ul className="check-list animate-on-scroll animate-slide-right">
                                <li className="animate-on-scroll animate-fade-up delay-100 hover-lift">
                                    <span className="icon-check">✔</span>
                                    <span>É para quem quer constância real</span>
                                </li>
                                <li className="animate-on-scroll animate-fade-up delay-200 hover-lift">
                                    <span className="icon-check">✔</span>
                                    <span>Deseja entender a profundidade da Bíblia</span>
                                </li>
                                <li className="animate-on-scroll animate-fade-up delay-300 hover-lift">
                                    <span className="icon-check">✔</span>
                                    <span>Busca crescimento prático no dia a dia</span>
                                </li>
                            </ul>
                            <ul className="cross-list animate-on-scroll animate-slide-left">
                                <li className="animate-on-scroll animate-fade-up delay-100 hover-lift">
                                    <span className="icon-cross">✖</span>
                                    <span>Não é para quem busca atalhos espirituais</span>
                                </li>
                                <li className="animate-on-scroll animate-fade-up delay-200 hover-lift">
                                    <span className="icon-cross">✖</span>
                                    <span>Não é para quem quer promessas fáceis</span>
                                </li>
                                <li className="animate-on-scroll animate-fade-up delay-300 hover-lift">
                                    <span className="icon-cross">✖</span>
                                    <span>Não quer compromisso com a jornada</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* 8️⃣ PROVA DE VALOR */}
                <section className="section principles-section">
                    <div className="container text-center max-w-800">
                        <h2 className="animate-on-scroll animate-fade-up">Em que baseamos nosso método?</h2>
                        <p className="subtitle mb-4 animate-on-scroll animate-fade-up delay-100">Não inventamos a roda. Voltamos às origens.</p>
                        <div className="principles-grid">
                            <div className="principle-card animate-on-scroll animate-fade-up delay-100 hover-lift">
                                <h3>Princípios Sólidos</h3>
                                <p>Teologia histórica, não modismos.</p>
                            </div>
                            <div className="principle-card animate-on-scroll animate-fade-up delay-200 hover-lift">
                                <h3>Didática Progressiva</h3>
                                <p>Do leite ao alimento sólido.</p>
                            </div>
                            <div className="principle-card animate-on-scroll animate-fade-up delay-300 hover-lift">
                                <h3>Educação Aplicada</h3>
                                <p>Fé que funciona na segunda-feira.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 9️⃣ e 🔟 CTA PREMIUM FINAL */}
                {/* 9️⃣ e 🔟 CTA PREMIUM FINAL (REFACTORED) */}
                <section id="comecar" className="cta-section-refactored">
                    <div className="cta-container">
                        <div className="cta-grid">

                            {/* Coluna 1: Texto */}
                            <div className="cta-text-block">
                                <h2 className="cta-main-title">
                                    Cresça espiritualmente com direção, não por acaso.
                                </h2>
                                <p className="cta-lead">
                                    Você não precisa mudar tudo hoje. Só precisa começar.
                                    Tenha acesso a estudos aprofundados, planos progressivos e ferramentas que ajudam você a viver a Palavra.
                                </p>
                                <div className="cta-actions">
                                    <button onClick={() => navigate('/login')} className="btn-action pulse-button">
                                        Comece sua jornada agora
                                    </button>
                                    <span className="cta-small-note">Gratuito para começar.</span>
                                </div>
                            </div>

                            {/* Coluna 2: Card */}
                            <div className="cta-card-block">
                                <div className="benefits-card-refactored">
                                    <h3>O QUE VOCÊ DESBLOQUEIA</h3>
                                    <ul className="benefits-list">
                                        <li>
                                            <span className="b-icon">✔</span> Jornada Completa Guiada
                                        </li>
                                        <li>
                                            <span className="b-icon">✔</span> Conteúdo Aprofundado (Contexto)
                                        </li>
                                        <li>
                                            <span className="b-icon">✔</span> Árvore de Progresso Espiritual
                                        </li>
                                        <li>
                                            <span className="b-icon">✔</span> Experiência Premium sem anúncios
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </main>

            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-brand">
                            <h3>Viver da Palavra</h3>
                            <p>Transformando mentes e corações.</p>
                        </div>
                        <div className="footer-links">
                            <h4>Links</h4>
                            <a href="#metodo">O Método</a>
                            <a href="#problema">O Problema</a>
                            <a href="/login">Login</a>
                        </div>
                        <div className="footer-social">
                            <h4>Social</h4>
                            <a href="#">Instagram</a>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        &copy; {new Date().getFullYear()} Viver da Palavra. Todos os direitos reservados.
                    </div>
                </div>
            </footer>
        </div >
    )
}

function FeatureCard({ title, desc, icon }) {
    return (
        <div className="feature-card">
            <div className="feature-icon">{icon}</div>
            <h3>{title}</h3>
            <p>{desc}</p>
        </div>
    )
}

export default LandingPage
