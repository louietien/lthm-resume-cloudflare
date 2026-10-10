import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const media = gsap.matchMedia();
media.add("(prefers-reduced-motion: no-preference)", () => {
  const heroElements = document.querySelectorAll(
    ".hero-copy > *, .profile-shell",
  );
  if (heroElements.length)
    gsap.from(heroElements, {
      y: 28,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: "power3.out",
      clearProps: "all",
    });
  document.querySelectorAll(".reveal-text").forEach((paragraph) => {
    gsap.fromTo(
      paragraph.querySelectorAll("span"),
      { opacity: 0.18 },
      {
        opacity: 1,
        stagger: 0.08,
        ease: "none",
        scrollTrigger: {
          trigger: paragraph,
          start: "top 80%",
          end: "bottom 45%",
          scrub: 0.6,
        },
      },
    );
  });
  document
    .querySelectorAll(".portrait-frame, .bento-image")
    .forEach((image) => {
      const filter = getComputedStyle(image).filter;
      const baseFilter = filter === "none" ? "" : filter;
      gsap
        .timeline({
          scrollTrigger: {
            trigger: image,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        })
        .fromTo(
          image,
          { scale: 0.8 },
          { scale: 1, duration: 0.5, ease: "none" },
        )
        .to(image, {
          opacity: 0.2,
          filter: `${baseFilter} brightness(0.6)`.trim(),
          duration: 0.5,
          ease: "none",
        });
    });
});
document.fonts.ready.then(() => ScrollTrigger.refresh());
document.querySelectorAll("img").forEach((image) => {
  if (!image.complete)
    image.addEventListener("load", () => ScrollTrigger.refresh(), {
      once: true,
    });
});
document
  .querySelectorAll("details")
  .forEach((details) =>
    details.addEventListener("toggle", () => ScrollTrigger.refresh()),
  );
window.addEventListener("pagehide", () => media.revert(), { once: true });
