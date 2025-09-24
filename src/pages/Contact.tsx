import { motion } from "framer-motion";
export default function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.3 }}
      className="font-roboto"
    >
      <h1>Contact</h1>
    </motion.div>
  );
}
