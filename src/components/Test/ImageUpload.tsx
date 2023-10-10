import { motion } from "framer-motion"
import { UtilConstants } from '../../shared/constant'

function ImageUpload() {
  

  return (
    <header>
      <motion.div 
            onClick={(e) => e.stopPropagation()}
            className="modal"
            variants={UtilConstants.variants}
            initial='initial'
            animate='visible'
            exit='exit'
> 
      <h4>Animated Button</h4>
    <div>Move your mouse over the button to see the effect</div>
      </motion.div>
    </header>
  )
}

export default ImageUpload