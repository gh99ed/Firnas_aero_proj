import React, { useContext, useState, useEffect } from "react"
import { app } from './firebaseConfig/config';
import {onAuthStateChanged,getAuth} from 'firebase/auth';