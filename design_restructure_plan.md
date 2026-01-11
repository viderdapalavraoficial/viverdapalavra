# Plano de Reestruturação Visual e UI/UX - Viver da Palavra

Baseado nos princípios de Design Premium, UX/UX Moderno e Otimização.

## 1. Fundação Visual (Design System)
- **Paleta de Cores Refinada**: Aprofundar o "Navy Blue" para criar mais contraste e ajustar o "Gold" para ser mais elegante e menos amarelo. Adicionar cores semânticas para feedback (sucesso, erro, info).
- **Tipografia**: Garantir o uso correto das famílias tipográficas (Playfair Display para títulos, Outfit para corpo), com pesos e entrelinhamentos otimizados para leitura (especialmente no mobile).
- **Sombras e Profundidade**: Substituir sombras simples por camadas de "elevação" (elevation) suaves para criar hierarquia 3D.

## 2. Layout e Estrutura (Grid & Flexbox)
- **Grid Modular**: Implementar um grid responsivo que se adapta fluidamente de mobile (1 col) para tablet (2 col) e desktop (3 ou 4 col).
- **Espaçamento (Whitespace)**: Aumentar o respiro entre seções para dar uma sensação de "luxo" e organização.

## 3. Componentização e Estilização
- **Botões**: Criar variantes claras (Primary, Secondary, Ghost) com estados de hover/active bem definidos (micro-interações).
- **Cards**: Padronizar os cards (Glassmorphism ou Solid) com bordas sutis e efeitos ao passar o mouse.
- **Hero Section**: Transformar a área inicial para ser impactante visualmente, usando melhor as imagens e o texto.

## 4. Otimização e Performance
- Uso de CSS moderno (Variáveis, Calc, Clamp) para reduzir a necessidade de, JavaScript para layout.
- Animações via CSS sempre que possível, deixando o GSAP para sequências complexas.

## Próximos Passos
1. Atualizar `index.css` com as novas variáveis globais.
2. Refazer a `Hero Section` para alto impacto.
3. Padronizar os componentes de `Card` e `Button`.
