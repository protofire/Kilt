import express from 'express';
import {
  getAttesterCtypeDetail,
  getAttesterCtypesForClaimer
} from '../controller/attesterCtypeController';
import { getCredentialsByDid } from '../controller/claimerController';

const claimerRoute = express.Router();

claimerRoute.get('/credential/:did', getCredentialsByDid);
claimerRoute.get('/attesters/:did', getAttesterCtypesForClaimer);
claimerRoute.get('/attesters/detail/:id', getAttesterCtypeDetail);


export { claimerRoute };
