import { motion } from "framer-motion";
export default function Blog() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.3 }}
      className="font-roboto"
    >
      <h1>Blog</h1>
    </motion.div>
  );
}
