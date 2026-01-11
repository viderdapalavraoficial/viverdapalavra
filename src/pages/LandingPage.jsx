import { useState, useLayoutEffect, useRef } from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import { Compass, TrendingDown, BookOpen, ShieldCheck, ChevronDown, ChevronUp, Star, User, Send, Heart, HandHeart, Quote, Clock, Award, ShoppingCart, X, Trash2, CheckCircle, Smartphone, Check, Zap, Download, Map, MessageCircle, Youtube, FileText, Play, Search, Mail, Users } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

function LandingPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [activeFaqIndex, setActiveFaqIndex] = useState(null)
    const heroSliderImages = ['/foto1.png', '/foto5.png', '/foto6.png', '/foto7.png', '/foto8.png']
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cart, setCart] = useState([])

    const coursesData = [
        {
            id: 1,
            title: "BaseBíblica",
            lessons: 15,
            students: "80.441",
            oldPrice: 47.00,
            price: 19.90,
            image: "/foto7.png",
            description: "Leve a conhecer os temas principais da Bíblia e a mensagem de Deus para você.",
            hasCertificate: true
        },
        {
            id: 2,
            title: "A Vida de Jesus",
            lessons: 16,
            students: "31.758",
            oldPrice: 47.00,
            price: 19.90,
            image: "/foto5.png",
            description: "Veja o filme sobre Jesus contado na perspectiva do Evangelho segundo Lucas.",
            hasCertificate: true
        },
        {
            id: 3,
            title: "Lendo as Escrituras AT1",
            lessons: 9,
            students: "2.177",
            oldPrice: 47.00,
            price: 19.90,
            image: "/foto8.png",
            description: "Cinco cursos Lendo as Escrituras - Antigo Testamento com vídeos do Bible Project.",
            hasCertificate: true
        }
    ];

    const bonusData = [
        {
            title: "Mapas Bíblicos Interativos",
            desc: "Visualize as jornadas de Paulo e o êxodo com clareza.",
            icon: <Map size={32} />,
            value: "R$ 19,90"
        },
        {
            title: "Guia de Jejum e Oração",
            desc: "Um roteiro prático para aprofundar sua vida espiritual.",
            icon: <Download size={32} />,
            value: "R$ 19,90"
        },
        {
            title: "Comunidade VIP WhatsApp",
            desc: "Troque experiências e tire dúvidas com outros alunos.",
            icon: <MessageCircle size={32} />,
            value: "R$ 19,90"
        }
    ];

    const pricingData = [
        {
            title: "Essencial",
            subtitle: "Para começar sua jornada",
            price: "R$ 0",
            period: "para sempre",
            buttonText: "Começar Grátis",
            featured: false,
            features: [
                "Devocional Diário",
                "Mural de Orações",
                "BibleReader (Lite)",
                "1 Trilha de Leitura Básica",
                "Acesso à Comunidade Geral"
            ]
        },
        {
            title: "Plano Pro",
            subtitle: "Crescimento Acelerado",
            price: "R$ 9,90",
            period: "por mês",
            buttonText: "Assinar Agora",
            featured: false,
            features: [
                "Tudo do Essencial",
                "Todos os Cursos",
                "Certificados Digitais",
                "BibleReader Full (66 livros)",
                "Suporte por E-mail"
            ]
        },
        {
            title: "Plano VIP",
            subtitle: "A experiência completa",
            oldPrice: "R$ 49,90",
            price: "R$ 19,90",
            period: "por mês",
            buttonText: "Quero ser VIP",
            featured: true,
            features: [
                "Tudo do Plano Pro",
                "Biblioteca de Pregações (Vídeo/PDF)",
                "PDFs de Estudo e Mapas",
                "Comunidade VIP WhatsApp",
                "Brindes Exclusivos Inclusos"
            ]
        }
    ];

    const sermonsData = [
        {
            id: 1,
            title: "Como ouvir a voz de Deus",
            speaker: "Pr. Luciano Subirá",
            duration: "45 min",
            category: "Intimidade",
            thumbnail: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=400&h=250&fit=crop"
        },
        {
            id: 2,
            title: "Vencendo a ansiedade",
            speaker: "Pr. Douglas Gonçalves",
            duration: "38 min",
            category: "Mente",
            thumbnail: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=250&fit=crop"
        },
        {
            id: 3,
            title: "O Segredo da Constância",
            speaker: "Pr. Paulo Borges Jr",
            duration: "52 min",
            category: "Disciplina",
            thumbnail: "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=400&h=250&fit=crop"
        }
    ];

    const pdfResourcesData = [
        { title: "Identidade em Cristo", theme: "Teologia", pages: "12 págs", type: "Esboço" },
        { title: "Propósito e Carreira", theme: "Vida Cristã", pages: "08 págs", type: "Estudo" },
        { title: "Liderança de Família", theme: "Família", pages: "15 págs", type: "Guia" },
        { title: "A Arte da Intercessão", theme: "Oração", pages: "10 págs", type: "Manual" }
    ];

    const addToCart = (course) => {
        if (cart.find(item => item.id === course.id)) {
            alert("Este curso já está no seu carrinho!");
            return;
        }
        setCart([...cart, course]);
        setIsCartOpen(true);
    };

    const removeFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const cartTotal = cart.reduce((total, item) => total + item.price, 0);

    const faqData = [
        {
            question: "Preciso ter conhecimento prévio da Bíblia?",
            answer: "Absolutamente não. Nosso método foi desenhado para pegar você pela mão, desde os conceitos mais básicos até as interpretações mais profundas, de forma progressiva e clara."
        },
        {
            question: "Como funciona a garantia de 7 dias?",
            answer: "É simples: você entra, acessa todo o conteúdo disponível e testa o método. Se por qualquer motivo você sentir que não é para você, basta nos enviar um e-mail e devolvemos 100% do seu investimento. Sem perguntas, sem burocracia."
        },
        {
            question: "Quanto tempo preciso dedicar por dia?",
            answer: "Com apenas 15 a 20 minutos por dia você já consegue implementar nosso método de leitura e estudo. O objetivo é consistência, não intensidade exaustiva."
        },
        {
            question: "O acesso é vitalício?",
            answer: "Depende do plano escolhido. Temos opções de assinatura anual e acesso vitalício para quem deseja ter a Palavra como guia permanente em sua jornada."
        }
    ]

    // 💬 Feedback Logic
    const [testimonials, setTestimonials] = useState(() => {
        const saved = localStorage.getItem('viver_testimonials');
        const initial = [
            { id: 1, name: "Maria Clara", content: "A forma como os estudos são organizados mudou minha rotina. Agora sinto clareza ao abrir as escrituras.", rating: 5, date: "10/01/2026" },
            { id: 2, name: "João Pedro", content: "O BibleReader é incrível! A interface facilita muito o foco no que realmente importa: a Palavra.", rating: 5, date: "08/01/2026" }
        ];
        return saved ? JSON.parse(saved) : initial;
    });

    const [feedbackForm, setFeedbackForm] = useState({ name: '', content: '', rating: 5 });

    const handleFeedbackSubmit = (e) => {
        e.preventDefault();
        if (!feedbackForm.name || !feedbackForm.content) return;

        const newFeedback = {
            id: Date.now(),
            ...feedbackForm,
            date: new Date().toLocaleDateString('pt-BR')
        };

        const updated = [newFeedback, ...testimonials];
        setTestimonials(updated);
        localStorage.setItem('viver_testimonials', JSON.stringify(updated));
        setFeedbackForm({ name: '', content: '', rating: 5 });
        alert("Obrigado pelo seu feedback! Sua opinião agora faz parte da nossa comunidade.");
    };

    // 🙏 Prayer & Devotional Logic (Dynamic Daily Content)
    const devotionalsStorage = [
        {
            verse: "Porque sou eu que conheço os planos que tenho para vocês', diz o Senhor, 'planos de fazê-los prosperar e não de causar dano, planos de dar a vocês esperança e um futuro.",
            reference: "Jeremias 29:11",
            theme: "ESPERANÇA",
            meditation: "Em meio às incertezas, lembre-se que existe um Deus que já desenhou o seu amanhã. Não foque nos obstáculos, mas na promessa de quem é fiel.",
            action: "Hoje, escreva um motivo pelo qual você é grato e confie o seu maior medo a Deus.",
            bg: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=1600&auto=format&fit=crop"
        },
        {
            verse: "Não fui eu que ordenei a você? Seja forte e corajoso! Não se apavore nem desanime, pois o Senhor, o seu Deus, estará com você por onde você andar.",
            reference: "Josué 1:9",
            theme: "CORAGEM",
            meditation: "A coragem não é a ausência de medo, mas a presença de Deus. Se Ele ordenou que você avance, as águas se abrirão. O desânimo é apenas um ruído; a presença d'Ele é a sua força real.",
            action: "Dê um passo em direção a algo que você teme, sabendo que você não caminha sozinho.",
            bg: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600&auto=format&fit=crop"
        },
        {
            verse: "Busquem, pois, em primeiro lugar o Reino de Deus e a sua justiça, e todas essas coisas lhes serão acrescentadas.",
            reference: "Mateus 6:33",
            theme: "PRIORIDADE",
            meditation: "Muitas vezes corremos atrás do 'acréscimo' e esquecemos da 'Fonte'. Quando o seu coração encontra descanso na prioridade certa, as outras peças da vida começam a se encaixar silenciosamente.",
            action: "Dedique os primeiros 15 minutos do seu próximo compromisso apenas para ouvir a voz de Deus.",
            bg: "https://images.unsplash.com/photo-1490730141103-6037f5d4337d?q=80&w=1600&auto=format&fit=crop"
        },
        {
            verse: "O Senhor é o meu pastor; de nada terei falta. Em verdes pastagens me faz repousar e me conduz a águas tranquilas.",
            reference: "Salmos 23:1-2",
            theme: "DESCANSO",
            meditation: "Não ter falta de nada não significa ter tudo o que queremos, mas ter tudo o que precisamos em Deus. Ele sabe quando sua alma precisa parar. Deixe-se guiar para o silêncio d'Ele.",
            action: "Desligue todas as telas por 30 minutos hoje e simplesmente descanse na presença do Pastor.",
            bg: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1600&auto=format&fit=crop"
        }
    ];

    // Get Daily Index based on day of year
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const dailyDevotional = devotionalsStorage[dayOfYear % devotionalsStorage.length];

    const [prayers, setPrayers] = useState(() => {
        const saved = localStorage.getItem('viver_prayers');
        const initial = [
            { id: 1, name: "Ana Paula", request: "Pela restauração da saúde do meu pai.", count: 12, userPrayed: false },
            { id: 2, name: "Ricardo G.", request: "Por direção profissional e sabedoria nas decisões.", count: 8, userPrayed: false }
        ];
        return saved ? JSON.parse(saved) : initial;
    });

    const [prayerInput, setPrayerInput] = useState({ name: '', request: '' });

    const handlePrayerSubmit = (e) => {
        e.preventDefault();
        if (!prayerInput.name || !prayerInput.request) return;

        const newPrayer = {
            id: Date.now(),
            name: prayerInput.name,
            request: prayerInput.request,
            count: 0,
            userPrayed: false
        };

        const updated = [newPrayer, ...prayers];
        setPrayers(updated);
        localStorage.setItem('viver_prayers', JSON.stringify(updated));
        setPrayerInput({ name: '', request: '' });
    };

    const handlePrayFor = (id) => {
        const updated = prayers.map(p => {
            if (p.id === id) {
                return { ...p, count: p.userPrayed ? p.count - 1 : p.count + 1, userPrayed: !p.userPrayed };
            }
            return p;
        });
        setPrayers(updated);
        localStorage.setItem('viver_prayers', JSON.stringify(updated));
    };
    const communityProgress = [
        {
            title: "Lendo as Escrituras AT1",
            students: [
                { name: "Adaíres Helena", time: "26 min", progress: 100 },
                { name: "Aldo Roberto", time: "23 horas", progress: 99 },
                { name: "José Caxala", time: "3 dias", progress: 99 }
            ]
        },
        {
            title: "Lendo as Escrituras 1NT",
            students: [
                { name: "Jhemerson Medeiros", time: "23 min", progress: 100 },
                { name: "Sabrina dos Santos", time: "26 dias", progress: 99 },
                { name: "Edson Paquisse", time: "7 horas", progress: 99 }
            ]
        },
        {
            title: "Lendo as Escrituras AT2",
            students: [
                { name: "Jhemerson Medeiros", time: "34 min", progress: 100 },
                { name: "José Caxala", time: "3 dias", progress: 99 },
                { name: "Aldo Roberto", time: "10 dias", progress: 98 }
            ]
        }
    ];

    const navigate = useNavigate()
    const mainRef = useRef(null)

    useLayoutEffect(() => {
        const spotlightTriggers = document.querySelectorAll('.grid-3, .hero');
        const handleSpotlight = (e) => {
            const cards = document.querySelectorAll('.problem-card, .hero');
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        };

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
                        x: 50,
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

            // Spotlight event listeners
            spotlightTriggers.forEach(trigger => {
                trigger.addEventListener('mousemove', handleSpotlight);
            });
        }, mainRef);

        const sliderInterval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % heroSliderImages.length);
        }, 4500);

        return () => {
            ctx.revert();
            spotlightTriggers.forEach(trigger => {
                trigger.removeEventListener('mousemove', handleSpotlight);
            });
            clearInterval(sliderInterval);
        };
    }, []);

    return (
        <div className="landing-page" ref={mainRef}>
            <header className="app-header">
                <div className="container nav-wrapper">
                    <a href="/" className="logo">
                        <img src="/logo_Viver.png" alt="Viver da Palavra" className="logo-img" />
                    </a>

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
                        <a href="#faq" onClick={() => setIsMenuOpen(false)}>Dúvidas</a>
                        <button className="cart-trigger-btn" onClick={() => setIsCartOpen(true)}>
                            <ShoppingCart size={22} />
                            {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
                        </button>
                        <a href="/login" className="btn btn-primary">Entrar</a>
                    </nav>
                </div>
            </header>

            <main>
                {/* 1️⃣ HERO – CONEXÃO IMEDIATA */}
                <section className="hero" id="home">
                    {/* Decorative Background Elements */}
                    <div className="hero-orb orb-1"></div>
                    <div className="hero-orb orb-2"></div>

                    <div className="container">
                        <div className="hero-content">
                            <h1>Estudar a Bíblia todos os dias não precisa ser <span>confuso nem cansativo.</span></h1>
                            <p>
                                Uma jornada bíblica moderna, guiada e progressiva para quem deseja viver a Palavra com clareza e constância.
                            </p>
                            <div className="hero-actions">
                                <button onClick={() => navigate('/login')} className="btn btn-premium pulse-effect btn-shine">Comece sua jornada gratuitamente</button>
                            </div>
                        </div>

                        {/* ✨ CINEMATIC VISUAL SHOWCASE */}
                        <div className="hero-visual-container animate-on-scroll animate-fade-up delay-300">
                            <div className="visual-frame visual-main">
                                <div className="slider-track">
                                    {heroSliderImages.map((img, idx) => (
                                        <img
                                            key={idx}
                                            src={img}
                                            alt={`Cena ${idx}`}
                                            className={idx === currentImageIndex ? 'active fade-in-slide' : 'inactive'}
                                        />
                                    ))}
                                </div>
                                <div className="visual-overlay"></div>
                                <div className="slider-dots">
                                    {heroSliderImages.map((_, idx) => (
                                        <div key={idx} className={`dot ${idx === currentImageIndex ? 'active' : ''}`}></div>
                                    ))}
                                </div>
                            </div>
                            <div className="visual-frame visual-side side-left">
                                <img src="/foto3.png" alt="Contexto Escrituras" />
                                <div className="visual-overlay"></div>
                            </div>
                            <div className="visual-frame visual-side side-right">
                                <img src="/foto4.png" alt="Estudo Profundo" />
                                <div className="visual-overlay"></div>
                            </div>

                            {/* Accent Glow */}
                            <div className="visual-glow"></div>
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
                                <span className="problem-icon floating-effect">
                                    <Compass size={32} />
                                </span>
                                <h3>Não sabia por onde começar</h3>
                                <p>Abria a Bíblia aleatoriamente e se sentia perdido sem um guia claro.</p>
                            </div>
                            <div className="problem-card animate-on-scroll animate-fade-up delay-200 hover-lift">
                                <span className="problem-icon floating-effect">
                                    <TrendingDown size={32} />
                                </span>
                                <h3>Parava depois de alguns dias</h3>
                                <p>A empolgação inicial passava e a culpa por "falhar" tomava conta.</p>
                            </div>
                            <div className="problem-card animate-on-scroll animate-fade-up delay-300 hover-lift">
                                <span className="problem-icon floating-effect">
                                    <BookOpen size={32} />
                                </span>
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

                {/* � BIBLIOTECA DE EDIFICAÇÃO (Sermons & PDFs) */}
                <section id="biblioteca" className="section library-section bg-light">
                    <div className="container">
                        <div className="section-header text-center">
                            <h2 className="animate-on-scroll animate-fade-up">Biblioteca de Edificação</h2>
                            <p className="subtitle animate-on-scroll animate-fade-up delay-100">Conteúdo selecionado para alimentar sua fé, onde e quando quiser.</p>
                        </div>

                        <div className="library-tabs mt-4">
                            <div className="tab-container animate-on-scroll animate-fade-up">
                                <div className="tab-header">
                                    <h3><Youtube size={20} /> Pregações Recomendadas</h3>
                                    <p>As melhores mensagens do Youtube organizadas por tema.</p>
                                </div>
                                <div className="sermons-grid">
                                    {sermonsData.map((sermon) => (
                                        <div key={sermon.id} className="sermon-card">
                                            <div className="sermon-thumb">
                                                <img src={sermon.thumbnail} alt={sermon.title} />
                                                <div className="play-overlay"><Play fill="white" size={32} /></div>
                                                <span className="s-duration">{sermon.duration}</span>
                                            </div>
                                            <div className="sermon-info">
                                                <span className="s-category">{sermon.category}</span>
                                                <h4>{sermon.title}</h4>
                                                <p>{sermon.speaker}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="tab-container animate-on-scroll animate-fade-up delay-200">
                                <div className="tab-header">
                                    <h3><FileText size={20} /> Estudos e Pregações em PDF</h3>
                                    <p>Materiais para leitura profunda e preparação de mensagens.</p>
                                </div>
                                <div className="pdf-list">
                                    {pdfResourcesData.map((pdf, idx) => (
                                        <div key={idx} className="pdf-resource-item">
                                            <div className="pdf-icon-box">
                                                <FileText size={24} />
                                            </div>
                                            <div className="pdf-details">
                                                <h4>{pdf.title}</h4>
                                                <span>{pdf.theme} • {pdf.pages}</span>
                                            </div>
                                            <button className="btn-download-pdf">
                                                <Download size={18} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="library-footer-cta">
                                    <button onClick={() => navigate('/login')} className="btn btn-primary btn-sm w-full">Ver Biblioteca Completa</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* �🛒 CURSOS DISPONÍVEIS (Marketplace) */}
                <section id="cursos" className="section courses-section">
                    <div className="container">
                        <div className="section-header text-center">
                            <h2 className="animate-on-scroll animate-fade-up">Cursos Disponíveis</h2>
                            <p className="subtitle animate-on-scroll animate-fade-up delay-100">Invista no seu crescimento espiritual com jornadas guiadas.</p>
                        </div>

                        <div className="courses-grid mt-4">
                            {coursesData.map((course) => (
                                <div key={course.id} className="course-card animate-on-scroll animate-fade-up">
                                    <div className="course-image-wrapper">
                                        <div className="course-badge">Novo</div>
                                        <img src={course.image} alt={course.title} />
                                    </div>
                                    <div className="course-info-content">
                                        <div className="course-meta">
                                            <span><BookOpen size={14} /> {course.lessons} aulas</span>
                                            <span><User size={14} /> {course.students} alunos</span>
                                        </div>
                                        <h3>{course.title}</h3>
                                        <p className="course-desc">{course.description}</p>

                                        {course.hasCertificate && (
                                            <div className="course-benefit-chip">
                                                <Award size={14} /> Com Certificado
                                            </div>
                                        )}

                                        <div className="course-footer">
                                            <div className="course-price-container">
                                                <span className="course-old-price">De R$ {course.oldPrice.toFixed(2).replace('.', ',')}</span>
                                                <span className="course-price">Por R$ {course.price.toFixed(2).replace('.', ',')}</span>
                                            </div>
                                            <button
                                                className="btn btn-outline btn-sm"
                                                onClick={() => addToCart(course)}
                                            >
                                                Adicionar ao Carrinho
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 💳 PLANOS E ASSINATURAS (Pricing) */}
                <section id="pricing" className="section pricing-section bg-light">
                    <div className="container">
                        <div className="section-header text-center">
                            <h2 className="animate-on-scroll animate-fade-up">Escolha sua Jornada</h2>
                            <p className="subtitle animate-on-scroll animate-fade-up delay-100">Planos flexíveis para quem busca constância e profundidade.</p>
                        </div>

                        <div className="pricing-grid mt-4">
                            {pricingData.map((plan, idx) => (
                                <div
                                    key={idx}
                                    className={`pricing-card animate-on-scroll animate-fade-up ${plan.featured ? 'featured' : ''}`}
                                    style={{ transitionDelay: `${idx * 150}ms` }}
                                >
                                    {plan.featured && <div className="featured-label">Mais Escolhido</div>}
                                    <div className="p-card-header">
                                        <h3>{plan.title}</h3>
                                        <p>{plan.subtitle}</p>
                                        <div className="p-price-block">
                                            {plan.oldPrice && <span className="p-old-price">{plan.oldPrice}</span>}
                                            <span className="p-price">{plan.price}</span>
                                            <span className="p-period">/ {plan.period}</span>
                                        </div>
                                    </div>
                                    <div className="p-card-body">
                                        <ul className="p-features">
                                            {plan.features.map((feature, fIdx) => (
                                                <li key={fIdx}>
                                                    <Check size={16} className="check-icon" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="p-card-footer">
                                        <button
                                            onClick={() => navigate('/login')}
                                            className={`btn w-full ${plan.featured ? 'btn-premium btn-shine' : 'btn-outline'}`}
                                        >
                                            {plan.buttonText}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 🎁 BÔNUS EXCLUSIVOS (Offer Stacking) */}
                <section id="bonus" className="section bonus-section">
                    <div className="container">
                        <div className="section-header text-center">
                            <h2 className="animate-on-scroll animate-fade-up">Presentes para acelerar sua jornada</h2>
                            <p className="subtitle animate-on-scroll animate-fade-up delay-100">Fazendo a assinatura mensal você ganha esses brindes exclusivos!</p>
                        </div>

                        <div className="bonus-grid mt-4">
                            {bonusData.map((bonus, idx) => (
                                <div key={idx} className="bonus-card animate-on-scroll animate-fade-up" style={{ transitionDelay: `${idx * 150}ms` }}>
                                    <div className="bonus-icon">{bonus.icon}</div>
                                    <div className="bonus-content">
                                        <div className="bonus-value">Valor: {bonus.value}</div>
                                        <h3>{bonus.title}</h3>
                                        <p>{bonus.desc}</p>
                                    </div>
                                    <div className="bonus-status-badge">Brinde Exclusivo</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
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

                {/* 🏆 COMMUNITY ACTIVITY (Top Notas) */}
                <section id="atividade" className="section community-activity-section">
                    <div className="container">
                        <div className="section-header text-center">
                            <h2 className="animate-on-scroll animate-fade-up">Comunidade em Ação</h2>
                            <p className="subtitle animate-on-scroll animate-fade-up delay-100">Veja quem já está avançando na jornada e transformando sua mente.</p>
                        </div>

                        <div className="activity-grid mt-4">
                            {communityProgress.map((track, idx) => (
                                <div key={idx} className="activity-card animate-on-scroll animate-fade-up" style={{ transitionDelay: `${idx * 150}ms` }}>
                                    <div className="activity-card-header">
                                        <h3>{track.title}</h3>
                                    </div>
                                    <div className="activity-card-body">
                                        <ul className="student-list">
                                            {track.students.map((student, sIdx) => (
                                                <li key={sIdx} className="student-item">
                                                    <div className="student-main-info">
                                                        <span className="student-name">{sIdx + 1}. {student.name}</span>
                                                        <div className="student-stats">
                                                            <span className="stat-time">
                                                                <Clock size={12} /> {student.time}
                                                            </span>
                                                            <span className={`stat-progress ${student.progress === 100 ? 'complete' : ''}`}>
                                                                {student.progress}%
                                                            </span>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 💬 FEEDBACK & TESTIMONIALS SECTION */}
                <section id="feedback" className="section feedback-section bg-light">
                    <div className="container">
                        <div className="section-header text-center">
                            <h2 className="animate-on-scroll animate-fade-up">Voz da Comunidade</h2>
                            <p className="subtitle animate-on-scroll animate-fade-up delay-100">O que os membros da nossa jornada estão vivenciando.</p>
                        </div>

                        <div className="feedback-grid mt-4">
                            {/* Display Testimonials */}
                            <div className="testimonials-display">
                                <div className="testimonials-scroll">
                                    {testimonials.map((t) => (
                                        <div key={t.id} className="testimonial-card animate-on-scroll animate-fade-up">
                                            <div className="testimonial-header">
                                                <div className="user-avatar">
                                                    <User size={20} />
                                                </div>
                                                <div className="user-info">
                                                    <h4>{t.name}</h4>
                                                    <span className="t-date">{t.date}</span>
                                                </div>
                                                <div className="t-rating">
                                                    {[...Array(t.rating)].map((_, i) => (
                                                        <Star key={i} size={14} fill="var(--color-secondary)" color="var(--color-secondary)" />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="testimonial-content">"{t.content}"</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Feedback Form */}
                            <div className="feedback-form-container animate-on-scroll animate-fade-up delay-200">
                                <div className="feedback-form-card">
                                    <h3>Deixe sua opinião</h3>
                                    <p>Sua experiência pode inspirar outros a começarem.</p>
                                    <form onSubmit={handleFeedbackSubmit} className="feedback-form mt-4">
                                        <div className="form-group">
                                            <label>Seu Nome</label>
                                            <input
                                                type="text"
                                                placeholder="Como gostaria de ser chamado?"
                                                value={feedbackForm.name}
                                                onChange={(e) => setFeedbackForm({ ...feedbackForm, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Experiência (Estrelas)</label>
                                            <div className="rating-select">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => setFeedbackForm({ ...feedbackForm, rating: star })}
                                                        className={feedbackForm.rating >= star ? 'active' : ''}
                                                    >
                                                        <Star size={24} fill={feedbackForm.rating >= star ? 'var(--color-secondary)' : 'none'} color="var(--color-secondary)" />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Seu Relato</label>
                                            <textarea
                                                placeholder="Conte-nos como a plataforma está ajudando você..."
                                                value={feedbackForm.content}
                                                onChange={(e) => setFeedbackForm({ ...feedbackForm, content: e.target.value })}
                                                rows="4"
                                                required
                                            ></textarea>
                                        </div>
                                        <button type="submit" className="btn btn-premium w-full mt-4 btn-shine">
                                            <Send size={18} /> Enviar Minha Opinião
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 🌟 HUB DE FÉ E COMUNIDADE (Devocional + Oração) */}
                <section id="comunidade" className="section hub-section">
                    <div className="container">
                        <div className="section-header text-center">
                            <h2 className="animate-on-scroll animate-fade-up">Cuidado & Comunhão</h2>
                            <p className="subtitle animate-on-scroll animate-fade-up delay-100">Um espaço para alimentar a alma e apoiar uns aos outros.</p>
                        </div>

                        <div className="hub-grid mt-4">
                            {/* Left: Daily Devotional */}
                            <div className="devotional-block animate-on-scroll animate-fade-up">
                                <div className="devotional-card" style={{ backgroundImage: `url(${dailyDevotional.bg})` }}>
                                    <div className="devotional-overlay"></div>
                                    <div className="devotional-inner">
                                        <div className="devotional-header-inline">
                                            <span className="devotional-tag">{dailyDevotional.theme}</span>
                                            <div className="devotional-date">
                                                {new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })}
                                            </div>
                                        </div>
                                        <Quote className="quote-icon" size={32} />
                                        <blockquote className="devotional-verse">
                                            "{dailyDevotional.verse}"
                                        </blockquote>
                                        <cite className="devotional-ref">— {dailyDevotional.reference}</cite>

                                        <div className="devotional-reflection">
                                            <h4>Reflexão do Dia</h4>
                                            <p>{dailyDevotional.meditation}</p>
                                        </div>

                                        <div className="devotional-action-card">
                                            <div className="action-label">Passo de Fé</div>
                                            <p>{dailyDevotional.action}</p>
                                        </div>

                                        <div className="devotional-footer-actions">
                                            <button className="btn-devotional-share">
                                                <Send size={16} /> Compartilhar
                                            </button>
                                            <div className="update-hint">Novo amanhã às 00:00</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Prayer Mural */}
                            <div className="prayer-block animate-on-scroll animate-fade-up delay-200">
                                <div className="prayer-mural-card">
                                    <div className="mural-header-premium">
                                        <div className="mural-title-box">
                                            <h3>Mural de Orações</h3>
                                            <div className="prayer-pulse-dot"></div>
                                        </div>
                                        <div className="community-stats-badge">
                                            <Users size={14} />
                                            <span>248 orando agora</span>
                                        </div>
                                    </div>

                                    {/* Prayer Input - Refined Form */}
                                    <form onSubmit={handlePrayerSubmit} className="prayer-form-premium">
                                        <div className="p-input-wrapper">
                                            <input
                                                type="text"
                                                placeholder="Como você se chama?"
                                                className="premium-input-field"
                                                value={prayerInput.name}
                                                onChange={(e) => setPrayerInput({ ...prayerInput, name: e.target.value })}
                                                required
                                            />
                                            <div className="input-glow"></div>
                                        </div>
                                        <div className="p-input-wrapper mt-3">
                                            <textarea
                                                placeholder="Qual o seu pedido de oração?"
                                                className="premium-textarea-field"
                                                value={prayerInput.request}
                                                onChange={(e) => setPrayerInput({ ...prayerInput, request: e.target.value })}
                                                required
                                            ></textarea>
                                            <div className="input-glow"></div>
                                        </div>
                                        <button type="submit" className="btn-prayer-send mt-3">
                                            <HandHeart size={18} /> Apresentar Pedido
                                        </button>
                                    </form>

                                    {/* Prayer List - Glass Cards Area */}
                                    <div className="prayer-list-premium">
                                        {prayers.map((p) => (
                                            <div key={p.id} className="prayer-glass-item">
                                                <div className="p-glass-content">
                                                    <div className="p-author-row">
                                                        <strong>{p.name}</strong>
                                                        <span className="p-time-tag">Há pouco</span>
                                                    </div>
                                                    <p className="p-request-text">{p.request}</p>
                                                    <div className="p-actions-row">
                                                        <button
                                                            className={`pray-glass-btn ${p.userPrayed ? 'active' : ''}`}
                                                            onClick={() => handlePrayFor(p.id)}
                                                        >
                                                            <div className="btn-inner">
                                                                <Heart size={16} fill={p.userPrayed ? "currentColor" : "none"} />
                                                                <span>{p.count > 0 ? p.count : 'Seja o primeiro'}</span>
                                                            </div>
                                                            <div className="btn-label">{p.userPrayed ? 'Você está orando' : 'Apoiar em Oração'}</div>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mural-footer-premium">
                                        <ShieldCheck size={14} />
                                        <span>Espaço moderado pela comunidade</span>
                                    </div>
                                </div>
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

                {/* 🏷️ FAQ & GUARANTEE SECTION (Strategic Conversion) */}
                <section id="faq" className="faq-section section">
                    <div className="container">
                        <div className="faq-grid">

                            {/* FAQ Accordion Side */}
                            <div className="faq-content-block">
                                <div className="section-header text-center">
                                    <h2 className="animate-on-scroll animate-fade-up">Dúvidas Frequentes</h2>
                                    <p className="subtitle animate-on-scroll animate-fade-up delay-100">Tudo o que você precisa saber para começar com segurança.</p>
                                </div>

                                <div className="faq-accordion mt-4">
                                    {faqData.map((item, index) => (
                                        <div
                                            key={index}
                                            className={`faq-item ${activeFaqIndex === index ? 'active' : ''} animate-on-scroll animate-fade-up`}
                                            style={{ transitionDelay: `${index * 100}ms` }}
                                        >
                                            <button
                                                className="faq-question"
                                                onClick={() => setActiveFaqIndex(activeFaqIndex === index ? null : index)}
                                            >
                                                <span>{item.question}</span>
                                                {activeFaqIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                            </button>
                                            <div className="faq-answer">
                                                <div className="faq-answer-content">
                                                    {item.answer}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Guarantee Card Side */}
                            <div className="guarantee-block">
                                <div className="guarantee-card animate-on-scroll animate-fade-up">
                                    <div className="guarantee-badge">
                                        <ShieldCheck size={48} className="guarantee-icon" />
                                        <div className="guarantee-days">7</div>
                                        <div className="guarantee-label">DIAS</div>
                                    </div>
                                    <h3>Garantia Incondicional</h3>
                                    <p>Nossa maior missão é o seu crescimento. Por isso, oferecemos risco zero: testou, não gostou? Dinheiro de volta.</p>
                                    <ul className="guarantee-features">
                                        <li>Reembolso imediato</li>
                                        <li>Sem letras miúdas</li>
                                        <li>Direito garantido por lei</li>
                                    </ul>
                                    <button onClick={() => navigate('/login')} className="btn-premium w-full mt-4">
                                        Quero começar agora
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
                {/* 🤝 SEÇÃO DE PARCERIAS & EXPANSÃO */}
                <section className="section partnerships-section">
                    <div className="container">
                        <div className="partnership-card animate-on-scroll animate-fade-up">
                            <div className="p-content">
                                <div className="p-icon-box">
                                    <Mail size={32} />
                                </div>
                                <div className="p-text">
                                    <h3>Expanda seu impacto conosco</h3>
                                    <p>Se você deseja ter um site ou um produto seu sendo vendido aqui, ou até mesmo implementar essa tecnologia para sua igreja, entre em contato.</p>
                                </div>
                            </div>
                            <div className="p-action">
                                <a href="mailto:viderdapalavra.oficial@gmail.com" className="btn btn-premium btn-shine">
                                    viderdapalavra.oficial@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="footer">
                <div className="container">
                    <div className="footer-grid">
                        <div className="footer-brand-column">
                            <img src="/logo_Viver.png" alt="Viver da Palavra" className="footer-logo" />
                            <p className="footer-tagline">Uma jornada bíblica moderna para transformar mentes e corações através da Palavra.</p>
                        </div>

                        <div className="footer-link-group">
                            <div className="footer-column">
                                <h4 className="footer-label">Plataforma</h4>
                                <nav className="footer-nav">
                                    <a href="#home">Início</a>
                                    <a href="#metodo">O Método</a>
                                    <a href="#problema">O Problema</a>
                                    <a href="#pricing">Planos</a>
                                </nav>
                            </div>

                            <div className="footer-column">
                                <h4 className="footer-label">Suporte</h4>
                                <nav className="footer-nav">
                                    <a href="/login">Área do Aluno</a>
                                    <a href="mailto:contato@viverdapalavra.com">Contato</a>
                                    <a href="#">Privacidade</a>
                                </nav>
                            </div>

                            <div className="footer-column">
                                <h4 className="footer-label">Social</h4>
                                <nav className="footer-social-links">
                                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-link">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                        <span>Instagram</span>
                                    </a>
                                    <a href="mailto:contato@viverdapalavra.com" className="social-icon-link">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                        <span>E-mail</span>
                                    </a>
                                </nav>
                            </div>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <div className="footer-bottom-content">
                            <p>&copy; {new Date().getFullYear()} Viver da Palavra. Todos os direitos reservados.</p>
                            <div className="footer-made-by">
                                Inspirado pela Palavra.
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* 🛒 SHOPPING CART DRAWER */}
            {isCartOpen && (
                <div className={`cart-overlay ${isCartOpen ? 'open' : ''}`} onClick={() => setIsCartOpen(false)}>
                    <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
                        <div className="cart-header">
                            <h2>Seu Carrinho</h2>
                            <button className="close-cart" onClick={() => setIsCartOpen(false)}>
                                <X size={24} />
                            </button>
                        </div>

                        {cart.length === 0 ? (
                            <div className="cart-empty">
                                <ShoppingCart size={48} />
                                <p>Seu carrinho está vazio.</p>
                                <button className="btn btn-primary mt-4" onClick={() => setIsCartOpen(false)}>
                                    Continuar Navegando
                                </button>
                            </div>
                        ) : (
                            <div className="cart-content">
                                <div className="cart-items">
                                    {cart.map((item) => (
                                        <div key={item.id} className="cart-item">
                                            <div className="item-img">
                                                <img src={item.image} alt={item.title} />
                                            </div>
                                            <div className="item-info">
                                                <h4>{item.title}</h4>
                                                <div className="item-benefit">
                                                    <Award size={12} /> Com Certificado
                                                </div>
                                                <p className="item-price">R$ {item.price.toFixed(2).replace('.', ',')}</p>
                                            </div>
                                            <button className="remove-item" onClick={() => removeFromCart(item.id)}>
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <div className="cart-footer">
                                    <div className="cart-total">
                                        <span>Subtotal</span>
                                        <strong>R$ {cartTotal.toFixed(2).replace('.', ',')}</strong>
                                    </div>
                                    <div className="cart-benefits-list">
                                        <div className="benefit-line">
                                            <CheckCircle size={14} /> Acesso Imediato
                                        </div>
                                        <div className="benefit-line">
                                            <Award size={14} /> Certificado Digital Incluso
                                        </div>
                                        <div className="benefit-line">
                                            <Smartphone size={14} /> Acesso no Celular/Tablet
                                        </div>
                                    </div>
                                    <button
                                        className="btn btn-premium w-full btn-shine mt-4"
                                        onClick={() => {
                                            alert("Encaminhando para o checkout seguro!");
                                            setIsCartOpen(false);
                                        }}
                                    >
                                        Finalizar Compra
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
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
