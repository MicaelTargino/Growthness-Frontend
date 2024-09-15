import React from 'react';
// Import all lucide icons (or just the ones you need)
import * as Icons from 'lucide-react';  // Assuming you're using lucide-react

const GoalComponent = ({ goal }) => {

   goal = goal.replaceAll(' ', '_').toLowerCase();

   var mapping = {
        'emagrecimento': <Icons.PersonStanding />,
        'hipertrofia': <Icons.BicepsFlexed />,
        'manutenção_da_saúde': <Icons.HeartPulse />
   }

  return (
    <div>
      {/* Render the icon component if it exists */}
      {mapping[goal]}
    </div>
  );
};

export default GoalComponent;
