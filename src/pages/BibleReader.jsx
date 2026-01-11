import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { bibleData } from '../data/mockBible'
import ReaderContext from '../components/ReaderContext'

function BibleReader() {
    const { livro, capitulo } = useParams()
    const navigate = useNavigate()
    // Default to 'john' and '4' if params are missing for MVP
    const currentChapterData = bibleData[livro || 'john']?.chapters[capitulo || 4]

    const [fontSize, setFontSize] = useState(18)

    if (!currentChapterData) {
        return <div className="text-center p-5">Capítulo não encontrado.</div>
    }

    return (
        <div className="reader-layout">
            {/* Reader Header */}
            <header className="reader-header">
                <button onClick={() => navigate('/dashboard')} className="back-btn">
                    ← Voltar
                </button>
                <div className="reader-title">
                    {bibleData[livro || 'john'].title} <span className="chapter-num">{currentChapterData.number}</span>
                </div>
                <div className="reader-controls">
                    <button onClick={() => setFontSize(Math.max(14, fontSize - 2))}>A-</button>
                    <button onClick={() => setFontSize(Math.min(28, fontSize + 2))}>A+</button>
                </div>
            </header>

            <main className="reader-content-wrapper">
                <div className="reader-container">
                    {/* Context Section */}
                    <ReaderContext briefing={currentChapterData.briefing} />

                    {/* Scripture Text */}
                    <div className="scripture-text" style={{ fontSize: `${fontSize}px` }}>
                        {currentChapterData.content.map((verse) => (
                            <span key={verse.verse} className="verse">
                                <sup className="verse-num">{verse.verse}</sup>
                                <span className="verse-content">{verse.text} </span>
                            </span>
                        ))}
                    </div>

                    {/* Action Footer */}
                    <div className="reader-footer">
                        <button className="btn btn-primary full-width">Concluir Leitura & Refletir</button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default BibleReader
