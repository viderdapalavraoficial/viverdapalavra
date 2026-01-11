import { useState, useEffect, useRef } from 'react'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import {
    MessageCircle,
    BookOpen,
    Compass,
    Star,
    Settings,
    LogOut,
    Send,
    Play,
    Clock,
    Trophy,
    Search,
    ChevronRight,
    Heart
} from 'lucide-react'

function Dashboard() {
    const [user, setUser] = useState(null)
    const [messages, setMessages] = useState([])
    const [inputValue, setInputValue] = useState('')
    const navigate = useNavigate()
    const chatEndRef = useRef(null)

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                setUser(currentUser)
                // Mensagem de boas-vindas inicial
                setMessages([
                    {
                        id: 1,
                        type: 'system',
                        text: `Paz, ${currentUser.displayName?.split(' ')[0] || 'Viajante'}! Que bom ter você aqui hoje.`,
                        time: new Date().toLocaleTimeString([], { hour: '2d', minute: '2d' })
                    },
                    {
                        id: 2,
                        type: 'system',
                        text: 'Você parou no Capítulo 4 de João. Deseja continuar sua jornada ou prefere explorar um novo curso?',
                        time: new Date().toLocaleTimeString([], { hour: '2d', minute: '2d' }),
                        options: [
                            { label: 'Continuar Lendo', action: () => navigate('/leitor/john/4') },
                            { label: 'Meus Cursos', action: () => setMessages(prev => [...prev, { id: Date.now(), type: 'user', text: 'Ver meus cursos' }]) },
                            { label: 'Pedido de Oração', action: () => setMessages(prev => [...prev, { id: Date.now(), type: 'user', text: 'Quero pedir oração' }]) }
                        ]
                    }
                ])
            } else {
                navigate('/login')
            }
        })
        return () => unsubscribe()
    }, [navigate])

    useEffect(scrollToBottom, [messages])

    const handleSendMessage = (e) => {
        e.preventDefault()
        if (!inputValue.trim()) return

        const userMsg = {
            id: Date.now(),
            type: 'user',
            text: inputValue,
            time: new Date().toLocaleTimeString([], { hour: '2d', minute: '2d' })
        }

        setMessages(prev => [...prev, userMsg])
        setInputValue('')

        // Resposta Simulado do Mentor
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                type: 'system',
                text: "Entendi! Estou processando sua solicitação. Enquanto isso, verifique as novidades na biblioteca de pregações.",
                time: new Date().toLocaleTimeString([], { hour: '2d', minute: '2d' })
            }])
        }, 1000)
    }

    const handleLogout = async () => {
        await signOut(auth)
        navigate('/')
    }

    if (!user) return <div className="loading-screen">Iniciando sua jornada...</div>

    return (
        <div className="student-dashboard">
            {/* Sidebar Navigation */}
            <aside className="student-sidebar">
                <div className="sidebar-header">
                    <img src="/logo_Viver.png" alt="Logo" className="sidebar-logo" />
                </div>

                <nav className="sidebar-nav">
                    <button className="nav-item active">
                        <MessageCircle size={20} />
                        <span>Chat/Início</span>
                    </button>
                    <button className="nav-item">
                        <BookOpen size={20} />
                        <span>Meus Cursos</span>
                    </button>
                    <button className="nav-item">
                        <Compass size={20} />
                        <span>Planos de Leitura</span>
                    </button>
                    <button className="nav-item">
                        <Star size={20} />
                        <span>Prêmio/Certificados</span>
                    </button>
                </nav>

                <div className="sidebar-footer">
                    <button className="nav-item">
                        <Settings size={20} />
                        <span>Configurações</span>
                    </button>
                    <button onClick={handleLogout} className="nav-item logout">
                        <LogOut size={20} />
                        <span>Sair</span>
                    </button>
                </div>
            </aside>

            {/* Main Chat Content */}
            <main className="chat-area">
                <header className="chat-header">
                    <div className="chat-title">
                        <h2>Área do Aluno</h2>
                        <div className="status-indicator">
                            <span className="dot"></span> Online agora
                        </div>
                    </div>
                    <div className="header-actions">
                        <Search size={20} className="action-icon" />
                    </div>
                </header>

                <div className="messages-container">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`message-row ${msg.type}`}>
                            {msg.type === 'system' && (
                                <div className="avatar-system">🌿</div>
                            )}
                            <div className="message-content">
                                <div className="message-bubble">
                                    {msg.text}
                                    {msg.options && (
                                        <div className="message-options">
                                            {msg.options.map((opt, i) => (
                                                <button key={i} onClick={opt.action} className="option-btn">
                                                    {opt.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <span className="message-time">{msg.time}</span>
                            </div>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>

                <div className="chat-input-wrapper">
                    <form onSubmit={handleSendMessage} className="chat-input-form">
                        <input
                            type="text"
                            placeholder="Pergunte algo ou diga seu pedido de oração..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <button type="submit" className="send-btn">
                            <Send size={20} />
                        </button>
                    </form>
                </div>
            </main>

            {/* Right Panel: Side Stats (Optional for Desktop) */}
            <aside className="stats-panel d-none-tablet">
                <div className="panel-section">
                    <h3>Minha Constância</h3>
                    <div className="streak-widget">
                        <div className="streak-fire">🔥</div>
                        <div className="streak-info">
                            <strong>3 Dias</strong>
                            <span>Você está voando!</span>
                        </div>
                    </div>
                </div>

                <div className="panel-section">
                    <h3>Próximo Passo</h3>
                    <div className="next-step-card">
                        <p>Filme: A Vida de Jesus</p>
                        <div className="mini-progress">
                            <div className="bar-fill" style={{ width: '65%' }}></div>
                        </div>
                        <button className="btn btn-sm btn-outline w-full mt-2">Retomar Agora</button>
                    </div>
                </div>

                <div className="panel-section">
                    <h3>Atalhos Úteis</h3>
                    <div className="quick-links">
                        <button className="q-link"><Heart size={16} /> Mural de Oração</button>
                        <button className="q-link"><Play size={16} /> Biblioteca de Vídeos</button>
                    </div>
                </div>
            </aside>
        </div>
    )
}

export default Dashboard

