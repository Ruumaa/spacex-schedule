import { getLaunchesUpcoming } from '@/utils/fetch';
import { LaunchesUpcoming } from '@/utils/types';
import CardSchedule from './CardSchedule';

const LaunchesScheduleDisplay = async () => {
  const data: LaunchesUpcoming[] = await getLaunchesUpcoming();

  return (
    <div>
      <CardSchedule data={data} />
    </div>
  );
};

export default LaunchesScheduleDisplay;
