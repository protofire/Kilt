import { useState } from 'react';
import { IAttesterCtype } from '../interfaces/attester-ctype';
import { FileURL, IAttestedCredential } from '../interfaces/credential';

export default function useClaimer() {
  const [ loading, setLoading ] = useState(false);

  const endpoint = process.env.REACT_APP_SERVER_URL ?? 'http://localhost:8000';

  // list all the credentials for the claimer.
  const onListCredentials = async (did: string) => {
    setLoading(true);
    const response = await fetch(`${endpoint}/api/claimer/credential/${did}`);
    const { data } = await response.json();
    setLoading(false);
    return data;
  };

  // load credential details for claimer
  const onLoadCredential = async (id: number) => {
    /* get credential details for claimer
     * method: GET
     * endpoint: /claimer/credential/:claimer_address/:credential_id
     * returns: {
     *  id: number,
     *  ctypeName: string,
     *  attesterAddress: string,
     *  status: string,
     *  terms: string,
     *  claimerText: string,
     *  files: [{name: string, url: string}, ...]
     * }
     */
    setLoading(true);
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
    setLoading(false);
    return {
      id: 'someid',
      attesterDid: 'some did',
      attesterName: 'Attester 1',
      ctypeName: 'CType 1',
      status: 'verified',
      terms: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore 
        magna aliqua. Ut enim ad minim veniam, quis nostrud 
        exercitation ullamco laboris nisi ut aliquip ex ea 
        commodo consequat.`,
      claimerText: 'some text from claimer',
      files: [{ name: 'file1.jpeg', url: 'http://something' }] as FileURL[]
    } as IAttestedCredential;
  };

  // list all the attesters for claimer
  const onListAttesters = async (did: string) => {
    setLoading(true);
    const response = await fetch(`${endpoint}/api/claimer/attesters/${did}`);
    const { data } = await response.json();
    setLoading(false);
    return data as IAttesterCtype[];
  };

  // load the attester ctype details for claimer
  const onLoadAttesterCtype = async (did: string) => {
    /* get attester ctype details
     * method: GET
     * endpoint: /attester/ctype/:attester_ctype_id
     * returns: {
     *  attester_ctype_id: number,
     *  attesterName: string,
     *  ctypeName: string,
     *  quote: number,
     *  terms: string,
     * }
     */
    setLoading(true);
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
    setLoading(false);
    return {
      attesterDid: did,
      terms: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore 
          magna aliqua. Ut enim ad minim veniam, quis nostrud 
          exercitation ullamco laboris nisi ut aliquip ex ea 
          commodo consequat.`,
      attesterName: `Attester ${did}`,
      ctypeId: 'telegram'
    };
  };

  // creates a new claim request for the attesters
  const submitClaim = async (text: string, files: FileList | null) => {
    /* creates a new request for attesters.
     * Will be added as a new message to the websocket - pub/sub connection
     * method: POST
     * endpoint: /attester/request/
     * body: {
     *  claimerAddress: string,
     *  ctype_id: number,
     *  claimerText: string,
     *  files: [File, ...],
     * }
     * returns: -
     */
    setLoading(true);
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
    setLoading(false);
    return { success: true };
  };

  return {
    onListCredentials,
    onListAttesters,
    onLoadAttesterCtype,
    onLoadCredential,
    submitClaim,
    loading
  };
}
