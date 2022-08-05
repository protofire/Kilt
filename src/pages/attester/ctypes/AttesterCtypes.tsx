import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table, { Row } from '../../../components/Table/Table';
import Topbar from '../../../components/Topbar/Topbar';
import useAttester from '../../../hooks/attester';
import useUser from '../../../hooks/user';
import { IAttesterCtype } from '../../../interfaces/attester-ctype';

function AttesterCtypes() {
  const navigate = useNavigate();
  const { user, loadUser } = useUser();
  const {
    onListAttesterCtypes,
    onDeleteAttesterCtype,
    loading
  } = useAttester();

  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    loadTable();
  }, []);

  const attesterCtypeToRow = (attesterCtype: IAttesterCtype) => ({
    id: attesterCtype.ctypeId,
    values: [
      { value: attesterCtype.ctypeName },
      { value: attesterCtype.quote + ' KILT' }
    ]
  }) as Row;

  const loadTable = () => {
    const currentUser = user ?? loadUser();
    if (!currentUser) return;
    onListAttesterCtypes(currentUser.did)
      .then((ctypes) =>
        ctypes.map((c) => attesterCtypeToRow(c)))
      .then(setRows);
  };

  const onAdd = () => navigate('create');
  const onDelete = async (id: string) => user &&
    onDeleteAttesterCtype(user.did, id).then(loadTable);

  return (
    <div className='wrapper'>
      <Topbar />
      {loading
        ? <div>Loading...</div>
        : <div className='center'>
          <span className='title'>CTypes & Quotes</span>
          <Table
            columns={[
              { name: 'Name' },
              { name: 'Quote' },
              { name: 'Actions' }]}
            rows={rows}
            onDelete={onDelete}
            disabled />
          <button className='primary' onClick={onAdd}>Add</button>
        </div>
      }
    </div>
  );
}

export default AttesterCtypes;
