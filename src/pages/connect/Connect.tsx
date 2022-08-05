import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from '../../hooks/user';

function Connect() {
  const navigate = useNavigate();
  const { login, logout, user } = useUser();

  const [did, setDid] = useState<string>('');

  const connect = async () => {
    const currentUser = user ?? await login(did);
    if (!currentUser) throw Error('Could not login user');

    if (currentUser.isAttester) navigate('/select-profile');
    else navigate('/claimer');
  };

  useEffect(() => {
    if (!user) return;
    setDid(user.did);
  }, [ user ]);

  return (
    <div className='wrapper'>
      <div className='center column'>
        <input type="text" value={did} placeholder={'did'} onChange={(e) => setDid(e.target.value)} />
        <button className='primary' onClick={connect}>
          Connect
        </button>
        <button className='secondary' onClick={logout}>
          Disconnect
        </button>
      </div>
    </div>
  );
}

export default Connect;
