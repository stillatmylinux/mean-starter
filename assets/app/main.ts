import './polyfills';
import * as $ from 'jquery';
window["$"] = $;
window["jQuery"] = $;

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from "./app.module";

platformBrowserDynamic().bootstrapModule(AppModule);