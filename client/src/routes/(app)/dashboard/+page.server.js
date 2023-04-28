import { authUser1 } from "../../../server/stores/stores";
import {get} from 'svelte/store'

console.log(get(authUser1), "server")