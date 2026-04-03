// Inicializar Reveal.js
        Reveal.initialize({
            hash: true,
            transition: 'fade', 
            controls: true,
            progress: true,
            center: true
        });

        // ==========================================
        // CÓDIGO MATRIX LIMPIO A PANTALLA COMPLETA
        // ==========================================
        const canvas = document.getElementById('matrixCanvas');
        const ctx = canvas.getContext('2d');

        // Ajustar al tamaño de la pantalla
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}|:<>?-=[]\\;\',./';
        const fontSize = 16;
        const columns = canvas.width / fontSize;

        const drops = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        function drawMatrix() {
            // Fondo semi-transparente para el rastro
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Letras verdes
            ctx.fillStyle = '#0F0';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = letters.charAt(Math.floor(Math.random() * letters.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                // Reiniciar la gota si llega al fondo y de forma aleatoria
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        // Ejecutar el Matrix
        setInterval(drawMatrix, 33);

        // Recalcular si se cambia el tamaño de la ventana
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });