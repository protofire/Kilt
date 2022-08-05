import { Request, Response } from 'express';
import { ICredentialByDidResponse } from '../interfaces/credentialEndpointResponse';
import { DidUri } from '@kiltprotocol/sdk-js';
import { buildCredential, getEndpointResponse, getEndpointsFromDid } from '../utils/claimUtils';
import { AttesterCtype } from '../schemas/schemas';


/**
 * Fetchs all the credentials for a claimer.
 * First, itlooks to the endpoints created fetching all the
 * data, and then filters this data to build the credentials.
 * @returns { success: boolean, data: ICredentialByDidResponse[] }
 */
export async function getCredentialsByDid(req: Request, res: Response) {
  const { did } = req.params;

  if (!did) {
    return res.status(400).json({
      success: false,
      msg: 'Must provide DiD parameter'
    });
  }

  if (!did.startsWith('did:kilt:')) {
    return res.status(400).json({
      success: false,
      msg: 'Wrong DiD format'
    });
  }

  const endpoints = await getEndpointsFromDid(did as DidUri);
  if (!endpoints) {
    return res.status(200).json({ success: true, data: [] });
  }

  const endpointResponse = await getEndpointResponse(endpoints[0]);
  const credentials: ICredentialByDidResponse[] = await Promise
    .all(endpointResponse.map(buildCredential));

  return res.status(200).json({ success: true, data: credentials });
}

/**
 * Gets all the AttesterCtypes saved on database.
 * @returns { success: boolean, data: AttesterCtype[] }
 */
export async function getAttesterCtypes(req: Request, res: Response) {
  const { did } = req.params;

  if (!did || !did.startsWith('did:kilt:')) {
    return res.status(400).json({
      success: false,
      msg: 'You must provide a valid did.'
    });
  }

  const attesterCtypes = await AttesterCtype.find();
  if (!attesterCtypes) {
    return res.status(400).json({
      success: false,
      msg: 'error connecting database'
    });
  }

  return res.status(200).json({ success: true, data: attesterCtypes});
}

/**
 * Gets a single AttesterCtype by id.
 * @returns { success: boolean, data: AttesterCtype }
 */
 export async function getAttesterCtypeDetail(req: Request, res: Response) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      msg: 'You must provide an id.'
    });
  }

  const attesterCtype = await AttesterCtype.findById(id);
  if (!attesterCtype) {
    return res.status(404).json({
      success: false,
      msg: 'Attester Ctype not found.'
    });
  }

  return res.status(200).json({ success: true, data: attesterCtype});
}