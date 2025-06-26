document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');
    const successMessage = document.getElementById('successMessage');
    const typedText = document.getElementById('typedText');
    const typingText = document.getElementById('typingText').textContent;

    // Typing animation
    let charIndex = 0;
    function typeText() {
        if (charIndex < typingText.length) {
            typedText.textContent += typingText.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 100);
        }
    }
    typeText();

    // Countdown timer
    const countdownDate = new Date("2025-07-01T00:00:00").getTime(); // Set your launch date here

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").textContent = days.toString().padStart(2, '0');
        document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
        document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById("days").textContent = "00";
            document.getElementById("hours").textContent = "00";
            document.getElementById("minutes").textContent = "00";
            document.getElementById("seconds").textContent = "00";
        }
    }

    const countdownInterval = setInterval(updateCountdown, 1000);

    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = form.querySelector('input[name="email"]').value;
        
        try {
            successMessage.textContent = 'Sending...';
            successMessage.classList.remove('hidden');
            
            // EmailJS configuration
            emailjs.init("L3wKLYqy8BUDSkRny");
            
            const templateParams = {
                email: email
            };

            await emailjs.send(
                "service_uboiw4j",
                "template_tg46slc",
                templateParams
            );

            successMessage.textContent = 'Thanks! We\'ll keep you posted about our launch 🚀';
            form.reset();
            setTimeout(() => {
                successMessage.classList.add('hidden');
            }, 3000);
        } catch (error) {
            console.error('Error:', error);
            successMessage.textContent = 'Error: ' + error.message;
            setTimeout(() => {
                successMessage.classList.add('hidden');
            }, 3000);
        }
    });
});

// Add EmailJS script
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
script.onload = function() {
    console.log('EmailJS loaded');
};
script.onerror = function() {
    console.error('Failed to load EmailJS');
};
document.head.appendChild(script);
