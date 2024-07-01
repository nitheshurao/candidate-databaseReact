import React from 'react';
import { motion } from 'framer-motion';

const Visualization = ({ candidates }) => {
  return (
    <div>
      {candidates?.map(candidate => (
        <motion.div
          key={candidate.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2>{candidate.name}</h2>
          <p>Skills: {candidate.skills}</p>
          <p>Experience: {candidate.experience}</p>
          {/* Other candidate details */}
        </motion.div>
      ))}
    </div>
  );
};

export default Visualization;
