export const UtilConstants = {
  variants: {
    initial: {
      y: "-100%",
      opacity: 1,
    },
    visible: {
      y: "0%",
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 52,
        stiffness: 300,
      },
    },
    exit: {
      y: "200%",
    },
  },
  bookContainerTransition: {
    hidden: { opacity: 0 },
    show: {
      transition: {
        delayChildren: 0.5,
      },
    },
  },
};
