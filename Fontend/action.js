document.addEventListener("DOMContentLoaded", () => {

   const reveals = document.querySelectorAll(`
        .tin-lon,
        .tin-nho,
        .chuong-trinh,
        .ben-trai-gt,
        .ben-phai-gt,
        .muc-so,
        .sk-noi-bat,
        .sk-da-card,
        .dt-o
    `);

    reveals.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        el.style.transition = "all 0.2s ease";
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    reveals.forEach(el => observer.observe(el));


    const header = document.getElementById("header");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 80) {
            header.style.padding = "6px 0";
            header.style.background = "rgba(255,255,255,0.95)";
            header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.08)";
            header.style.backdropFilter = "blur(8px)";
        } else {
            header.style = "";
        }
    });


    const banner = document.querySelector(".anh-banner");
    let ticking = false;

    window.addEventListener("scroll", () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const y = window.scrollY;
                if (banner) {
                    banner.style.transform = `translateY(${y * 0.12}px)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    });


    const counters = document.querySelectorAll(".so");

    const counterObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                const el = entry.target;
                const target = parseInt(el.innerText.replace(/\D/g, ""));
                let count = 0;

                const step = target / 200;

                const update = () => {
                    count += step;
                    if (count < target) {
                        el.innerText = Math.floor(count) + "+";
                        requestAnimationFrame(update);
                    } else {
                        el.innerText = target + "+";
                    }
                };

                el.innerText = "0";
                update();

                counterObs.unobserve(el);
            }
        });
    }, { threshold: 0.2 });

   
    const chimLac = document.querySelector(".mascot-way-ctn .mascot");

    if (chimLac) {
        const lacObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                  
                    chimLac.classList.add("chay-ra");
                    
                   
                    lacObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 }); 

        lacObserver.observe(chimLac);
    }

    counters.forEach(c => counterObs.observe(c));



   

    const cards = document.querySelectorAll(`
        .chuong-trinh,
        .tin-lon,
        .tin-nho,
        .sk-da-card,
        .dt-o
    `);

    cards.forEach(card => {

        card.style.transition = "all 0.3s ease";

        card.addEventListener("mouseenter", () => {
            card.style.transform = "translateY(-6px)";
            card.style.boxShadow = "0 10px 25px rgba(0,0,0,0.1)";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
            card.style.boxShadow = "";
        });

    });



   

    const svImg = document.querySelector(".tv-anh-sv");

    const svObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                svImg.classList.add("show");
            }
        });
    }, { threshold: 0.3 });

    if (svImg) svObserver.observe(svImg);



    

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", function(e) {
            const id = this.getAttribute("href");

            if (id.length > 1) {
                e.preventDefault();
                document.querySelector(id)?.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });

});