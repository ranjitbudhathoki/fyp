import { useQuery } from 'react-query';
import systemAxios from '../../api/systemAxios';
import { useSystemAdmin } from '../../context/AdminContext';
import Spinner from '../Spinner/Spinner';
import UserChart from './UserChart';
// import WorkspaceChart from './WorkspaceChart';

function SystemAdminDashboard() {
  const { admin } = useSystemAdmin();

  const { data, isLoading } = useQuery('total-user', async () => {
    const res = await systemAxios.get('/api/admin/users/count', {
      headers: {
        authorization: `Bearer ${(admin as any).token}`,
      },
    });
    return res.data?.data;
  });

  const { data: matches, isLoading: isMatchDataLoading } = useQuery(
    'total-matches',
    async () => {
      const res = await systemAxios.get('/api/admin/matches/count', {
        headers: {
          authorization: `Bearer ${(admin as any).token}`,
        },
      });
      return res.data?.data;
    }
  );

  const { data: userChartData, isLoading: isUserChartDataLoading } = useQuery(
    'user-chart-data',
    async () => {
      const res = await systemAxios.get('/api/admin/users/data', {
        headers: {
          authorization: `Bearer ${(admin as any).token}`,
        },
      });
      return res.data?.data;
    }
  );

  console.log('user chart data', userChartData);

  // const { data: workspaceChartData, isLoading: isWorkspaceChartLoading } =
  //   useQuery('workspace-chart-data', async () => {
  //     const res = await systemAxios.get('/system-admin/workspacebyMonth', {
  //       headers: {
  //         authorization: `Bearer ${(admin as any).token}`,
  //       },
  //     });
  //     return res.data?.data;
  //   });

  if (isLoading) return <Spinner isLoading={isLoading} />;

  if (isUserChartDataLoading)
    return <Spinner isLoading={isUserChartDataLoading} />;

  if (isMatchDataLoading) {
    return <Spinner isLoading={isMatchDataLoading} />;
  }
  return (
    <div>
      <div className="flex gap-8 items-center justify-center">
        <div className="flex gap-2 flex-col items-center">
          <h2 className="text-xl text-gray-400">Total Users</h2>
          <p className="text-5xl text-custom-light-green">
            {String(data?.totalUser).padStart(2, '0')}
          </p>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <h2 className="text-xl text-gray-400">Total Matches</h2>
          <p className="text-5xl text-custom-light-green">
            {String(matches?.totalMatches).padStart(2, '0')}
          </p>
        </div>
      </div>
      {/* <UserChart data={{ february: 2 }} /> */}
      {/* <WorkspaceChart data={workspaceChartData} /> */}
    </div>
  );
}

export default SystemAdminDashboard;
