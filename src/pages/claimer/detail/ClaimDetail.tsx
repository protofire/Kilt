import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Topbar from '../../../components/Topbar/Topbar';
import useClaimer from '../../../hooks/claimer';
import { IAttestedCredential } from '../../../interfaces/credential';

function ClaimDetail() {
  const params = useParams();
  const { onLoadCredential, loading } = useClaimer();
  const [credential, setCredential] = useState<IAttestedCredential | null>(null);

  useEffect(() => {
    onLoadCredential(Number(params.id)).then(setCredential);
  }, []);

  return (
    <div className='wrapper'>
      <Topbar />
      {loading
        ? <div> Loading ... </div>
        : <div className='column page'>
          <span className='title'>Claim</span>
          <span className='subtitle'>
            Attester: <strong>{credential?.attesterName}</strong><em> </em>
            Status: <strong>{credential?.status}</strong>
          </span>
          <span className='subtitle'>Terms and Conditions</span>
          <span className='text'>{credential?.terms}</span>
        </div>}
    </div>
  );
}

export default ClaimDetail;
