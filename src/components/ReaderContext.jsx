import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

function ReaderContext({ briefing }) {
    const [isOpen, setIsOpen] = useState(true)

    if (!briefing) return null

    return (
        <div className={`context-briefing ${isOpen ? 'open' : 'closed'}`}>
            <div className="briefing-header" onClick={() => setIsOpen(!isOpen)}>
                <div className="briefing-title">
                    <span className="icon">🏛️</span>
                    <span>Contexto Histórico & Cultural</span>
                </div>
                <button className="toggle-btn">{isOpen ? '▼' : '▲'}</button>
            </div>

            {isOpen && (
                <div className="briefing-content">
                    <div className="briefing-grid">
                        <div className="briefing-item">
                            <span className="label">Autor</span>
                            <p>{briefing.who}</p>
                        </div>
                        <div className="briefing-item">
                            <span className="label">Público-Alvo</span>
                            <p>{briefing.audience}</p>
                        </div>
                        <div className="briefing-item full-width">
                            <span className="label">Cenário</span>
                            <p>{briefing.context}</p>
                        </div>
                        <div className="briefing-item full-width highlight">
                            <span className="label">Tema Chave</span>
                            <p>{briefing.keyTheme}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

ReaderContext.propTypes = {
    briefing: PropTypes.shape({
        who: PropTypes.string,
        audience: PropTypes.string,
        context: PropTypes.string,
        keyTheme: PropTypes.string
    })
}

export default ReaderContext
