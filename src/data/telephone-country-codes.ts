/**
 * Copyright 2020, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * An object that maps a 2 char country code to its official telephone code.
 * [View all supported countries](https://github.com/sumup-oss/intl-js/blob/main/src/data/telephone-country-codes.ts).
 */
export const TELEPHONE_COUNTRY_CODES: { [country: string]: string } = {
  // Andorra
  AD: '376',
  // United Arab Emirates
  AE: '971',
  // Afghanistan
  AF: '93',
  // Antigua and Barbuda
  AG: '1268',
  // Anguilla
  AI: '1264',
  // Albania
  AL: '355',
  // Armenia
  AM: '374',
  // Angola
  AO: '244',
  // Argentina
  AR: '54',
  // American Samoa
  AS: '1684',
  // Austria
  AT: '43',
  // Australia
  AU: '61',
  // Aruba
  AW: '297',
  // Aland Islands
  AX: '35818',
  // Azerbaijan
  AZ: '994',
  // Bosnia and Herzegovina
  BA: '387',
  // Barbados
  BB: '1246',
  // Bangladesh
  BD: '880',
  // Belgium
  BE: '32',
  // Burkina Faso
  BF: '226',
  // Bulgaria
  BG: '359',
  // Bahrain
  BH: '973',
  // Burundi
  BI: '257',
  // Benin
  BJ: '229',
  // Saint Barthelemy
  BL: '590',
  // Bermuda
  BM: '1441',
  // Brunei Darussalam
  BN: '673',
  // Bolivia
  BO: '591',
  // Bonaire, Sint Eustatius and Saba
  BQ: '599',
  // Brazil
  BR: '55',
  // Bahamas
  BS: '1242',
  // Bhutan
  BT: '975',
  // Bouvet Island
  BV: '47',
  // Botswana
  BW: '267',
  // Belarus
  BY: '375',
  // Belize
  BZ: '501',
  // Canada
  CA: '1',
  // Cocos (Keeling) Islands
  CC: '61',
  // Congo
  CD: '243',
  // Central African Republic
  CF: '236',
  // Congo Republic of the Democratic
  CG: '242',
  // Switzerland
  CH: '41',
  // Ivory Coast
  CI: '225',
  // Cook Islands
  CK: '682',
  // Chile
  CL: '56',
  // Cameroon
  CM: '237',
  // China
  CN: '86',
  // Colombia
  CO: '57',
  // Costa Rica
  CR: '506',
  // Cuba
  CU: '53',
  // Cape Verde
  CV: '238',
  // Curaçao
  CW: '599',
  // Christmas Island
  CX: '61',
  // Cyprus
  CY: '357',
  // Czech Republic
  CZ: '420',
  // Germany
  DE: '49',
  // Djibouti
  DJ: '253',
  // Denmark
  DK: '45',
  // Dominica
  DM: '1767',
  // Dominican Republic
  // TODO: DO: '+1-809 and 1-829',
  // Algeria
  DZ: '213',
  // Ecuador
  EC: '593',
  // Estonia
  EE: '372',
  // Egypt
  EG: '20',
  // Western Sahara
  EH: '212',
  // Eritrea
  ER: '291',
  // Spain
  ES: '34',
  // Ethiopia
  ET: '251',
  // Finland
  FI: '358',
  // Fiji
  FJ: '679',
  // Falkland Islands (Malvinas)
  FK: '500',
  // Micronesia Federated States of
  FM: '691',
  // Faroe Islands
  FO: '298',
  // France
  FR: '33',
  // Gabon
  GA: '241',
  // United Kingdom
  GB: '44',
  // Grenada
  GD: '1473',
  // Georgia
  GE: '995',
  // French Guiana
  GF: '594',
  // Guernsey
  GG: '441481',
  // Ghana
  GH: '233',
  // Gibraltar
  GI: '350',
  // Greenland
  GL: '299',
  // Gambia
  GM: '220',
  // Guinea
  GN: '224',
  // Guadeloupe
  GP: '590',
  // Equatorial Guinea
  GQ: '240',
  // Greece
  GR: '30',
  // South Georgia and the South Sandwich Islands
  GS: '500',
  // Guatemala
  GT: '502',
  // Guam
  GU: '1671',
  // Guinea-Bissau
  GW: '245',
  // Guyana
  GY: '592',
  // Hong Kong
  HK: '852',
  // Heard and Mc Donald Islands
  HM: '61',
  // Honduras
  HN: '504',
  // Croatia (Hrvatska)
  HR: '385',
  // Haiti
  HT: '509',
  // Hungary
  HU: '36',
  // Indonesia
  ID: '62',
  // Ireland
  IE: '353',
  // Israel
  IL: '972',
  // Isle of Man
  IM: '441624',
  // India
  IN: '91',
  // British Indian Ocean Territory
  IO: '246',
  // Iraq
  IQ: '964',
  // Iran (Islamic Republic of)
  IR: '98',
  // Iceland
  IS: '354',
  // Italy
  IT: '39',
  // Jersey
  JE: '441534',
  // Jamaica
  JM: '1876',
  // Jordan
  JO: '962',
  // Japan
  JP: '81',
  // Kenya
  KE: '254',
  // Kyrgyzstan
  KG: '996',
  // Cambodia
  KH: '855',
  // Kiribati
  KI: '686',
  // Comoros
  KM: '269',
  // Saint Kitts
  KN: '1869',
  // Korea North
  KP: '850',
  // Korea South
  KR: '82',
  // Kuwait
  KW: '965',
  // Cayman Islands
  KY: '1345',
  // Kazakhstan
  KZ: '7',
  // Laos
  LA: '856',
  // Lebanon
  LB: '961',
  // Saint Lucia
  LC: '1758',
  // Liechtenstein
  LI: '423',
  // Sri Lanka
  LK: '94',
  // Liberia
  LR: '231',
  // Lesotho
  LS: '266',
  // Lithuania
  LT: '370',
  // Luxembourg
  LU: '352',
  // Latvia
  LV: '371',
  // Libyan Arab Jamahiriya
  LY: '218',
  // Morocco
  MA: '212',
  // Monaco
  MC: '377',
  // Moldova Republic of
  MD: '373',
  // Montenegro
  ME: '382',
  // Saint Martin (French part)
  MF: '590',
  // Madagascar
  MG: '261',
  // Marshall Islands
  MH: '692',
  // Macedonia
  MK: '389',
  // Mali
  ML: '223',
  // Myanmar
  MM: '95',
  // Mongolia
  MN: '976',
  // Macau
  MO: '853',
  // Northern Mariana Islands
  MP: '1670',
  // Martinique
  MQ: '596',
  // Mauritania
  MR: '222',
  // Montserrat
  MS: '1664',
  // Malta
  MT: '356',
  // Mauritius
  MU: '230',
  // Maldives
  MV: '960',
  // Malawi
  MW: '265',
  // Mexico
  MX: '52',
  // Malaysia
  MY: '60',
  // Mozambique
  MZ: '258',
  // Namibia
  NA: '264',
  // New Caledonia
  NC: '687',
  // Niger
  NE: '227',
  // Norfolk Island
  NF: '672',
  // Nigeria
  NG: '234',
  // Nicaragua
  NI: '505',
  // Netherlands
  NL: '31',
  // Norway
  NO: '47',
  // Nepal
  NP: '977',
  // Nauru
  NR: '674',
  // Niue
  NU: '683',
  // New Zealand
  NZ: '64',
  // Oman
  OM: '968',
  // Panama
  PA: '507',
  // Peru
  PE: '51',
  // French Polynesia
  PF: '689',
  // Papua New Guinea
  PG: '675',
  // Philippines
  PH: '63',
  // Pakistan
  PK: '92',
  // Poland
  PL: '48',
  // Saint Pierre and Miquelon
  PM: '508',
  // Pitcairn
  PN: '870',
  // Puerto Rico
  // TODO: PR: '+1-787 and 1-939',
  // Palestinian Territory
  PS: '970',
  // Portugal
  PT: '351',
  // Palau
  PW: '680',
  // Paraguay
  PY: '595',
  // Qatar
  QA: '974',
  // Reunion
  RE: '262',
  // Romania
  RO: '40',
  // Serbia
  RS: '381',
  // Russian Federation
  RU: '7',
  // Rwanda
  RW: '250',
  // Saudi Arabia
  SA: '966',
  // Solomon Islands
  SB: '677',
  // Seychelles
  SC: '248',
  // Sudan
  SD: '249',
  // Sweden
  SE: '46',
  // Singapore
  SG: '65',
  // Saint Helena
  SH: '290',
  // Slovenia
  SI: '386',
  // Svalbard and Jan Mayen Islands
  SJ: '47',
  // Slovakia (Slovak Republic)
  SK: '421',
  // Sierra Leone
  SL: '232',
  // San Marino
  SM: '378',
  // Senegal
  SN: '221',
  // Somalia
  SO: '252',
  // Suriname
  SR: '597',
  // South Sudan
  SS: '211',
  // Sao Tome and Principe
  ST: '239',
  // El Salvador
  SV: '503',
  // Sint Maarten
  SX: '599',
  // Syrian Arab Republic
  SY: '963',
  // Swaziland
  SZ: '268',
  // Turks and Caicos Islands
  TC: '1649',
  // Chad
  TD: '235',
  // French Southern Territories
  TF: '262',
  // Togo
  TG: '228',
  // Thailand
  TH: '66',
  // Tajikistan
  TJ: '992',
  // Tokelau
  TK: '690',
  // East Timor
  TL: '670',
  // Turkmenistan
  TM: '993',
  // Tunisia
  TN: '216',
  // Tonga
  TO: '676',
  // Turkey
  TR: '90',
  // Trinidad and Tobago
  TT: '1868',
  // Tuvalu
  TV: '688',
  // Taiwan
  TW: '886',
  // Tanzania
  TZ: '255',
  // Ukraine
  UA: '380',
  // Uganda
  UG: '256',
  // United States
  US: '1',
  // Uruguay
  UY: '598',
  // Uzbekistan
  UZ: '998',
  // Vatican City State (Holy See)
  VA: '379',
  // Saint Vincent Grenadines
  VC: '1784',
  // Venezuela
  VE: '58',
  // Virgin Islands (British)
  VG: '1284',
  // Virgin Islands (US)
  VI: '1340',
  // Vietnam
  VN: '84',
  // Vanuatu
  VU: '678',
  // Wallis and Futuna Islands
  WF: '681',
  // Samoa
  WS: '685',
  // Kosovo
  XK: '383',
  // Yemen
  YE: '967',
  // Mayotte
  YT: '262',
  // South Africa
  ZA: '27',
  // Zambia
  ZM: '260',
  // Zimbabwe
  ZW: '263',
} satisfies Record<string, `${number}`>;

// const tmp = {
//   AD: '376',
//   AE: '971',
//   AF: '93',
//   AG: '+1-268',
//   AI: '+1-264',
//   AL: '355',
//   AM: '374',
//   AO: '244',
//   AQ: '',
//   AR: '54',
//   AS: '+1-684',
//   AT: '43',
//   AU: '61',
//   AW: '297',
//   AX: '+358-18',
//   AZ: '994',
//   BA: '387',
//   BB: '+1-246',
//   BD: '880',
//   BE: '32',
//   BF: '226',
//   BG: '359',
//   BH: '973',
//   BI: '257',
//   BJ: '229',
//   BL: '590',
//   BM: '+1-441',
//   BN: '673',
//   BO: '591',
//   BQ: '599',
//   BR: '55',
//   BS: '+1-242',
//   BT: '975',
//   BV: '',
//   BW: '267',
//   BY: '375',
//   BZ: '501',
//   CA: '1',
//   CC: '61',
//   CD: '243',
//   CF: '236',
//   CG: '242',
//   CH: '41',
//   CI: '225',
//   CK: '682',
//   CL: '56',
//   CM: '237',
//   CN: '86',
//   CO: '57',
//   CR: '506',
//   CU: '53',
//   CV: '238',
//   CW: '599',
//   CX: '61',
//   CY: '357',
//   CZ: '420',
//   DE: '49',
//   DJ: '253',
//   DK: '45',
//   DM: '+1-767',
//   DO: '+1-809 and 1-829',
//   DZ: '213',
//   EC: '593',
//   EE: '372',
//   EG: '20',
//   EH: '212',
//   ER: '291',
//   ES: '34',
//   ET: '251',
//   FI: '358',
//   FJ: '679',
//   FK: '500',
//   FM: '691',
//   FO: '298',
//   FR: '33',
//   GA: '241',
//   GB: '44',
//   GD: '+1-473',
//   GE: '995',
//   GF: '594',
//   GG: '+44-1481',
//   GH: '233',
//   GI: '350',
//   GL: '299',
//   GM: '220',
//   GN: '224',
//   GP: '590',
//   GQ: '240',
//   GR: '30',
//   GS: '',
//   GT: '502',
//   GU: '+1-671',
//   GW: '245',
//   GY: '592',
//   HK: '852',
//   HM: ' ',
//   HN: '504',
//   HR: '385',
//   HT: '509',
//   HU: '36',
//   ID: '62',
//   IE: '353',
//   IL: '972',
//   IM: '+44-1624',
//   IN: '91',
//   IO: '246',
//   IQ: '964',
//   IR: '98',
//   IS: '354',
//   IT: '39',
//   JE: '+44-1534',
//   JM: '+1-876',
//   JO: '962',
//   JP: '81',
//   KE: '254',
//   KG: '996',
//   KH: '855',
//   KI: '686',
//   KM: '269',
//   KN: '+1-869',
//   KP: '850',
//   KR: '82',
//   KW: '965',
//   KY: '+1-345',
//   KZ: '7',
//   LA: '856',
//   LB: '961',
//   LC: '+1-758',
//   LI: '423',
//   LK: '94',
//   LR: '231',
//   LS: '266',
//   LT: '370',
//   LU: '352',
//   LV: '371',
//   LY: '218',
//   MA: '212',
//   MC: '377',
//   MD: '373',
//   ME: '382',
//   MF: '590',
//   MG: '261',
//   MH: '692',
//   MK: '389',
//   ML: '223',
//   MM: '95',
//   MN: '976',
//   MO: '853',
//   MP: '+1-670',
//   MQ: '596',
//   MR: '222',
//   MS: '+1-664',
//   MT: '356',
//   MU: '230',
//   MV: '960',
//   MW: '265',
//   MX: '52',
//   MY: '60',
//   MZ: '258',
//   NA: '264',
//   NC: '687',
//   NE: '227',
//   NF: '672',
//   NG: '234',
//   NI: '505',
//   NL: '31',
//   NO: '47',
//   NP: '977',
//   NR: '674',
//   NU: '683',
//   NZ: '64',
//   OM: '968',
//   PA: '507',
//   PE: '51',
//   PF: '689',
//   PG: '675',
//   PH: '63',
//   PK: '92',
//   PL: '48',
//   PM: '508',
//   PN: '870',
//   PR: '+1-787 and 1-939',
//   PS: '970',
//   PT: '351',
//   PW: '680',
//   PY: '595',
//   QA: '974',
//   RE: '262',
//   RO: '40',
//   RS: '381',
//   RU: '7',
//   RW: '250',
//   SA: '966',
//   SB: '677',
//   SC: '248',
//   SD: '249',
//   SE: '46',
//   SG: '65',
//   SH: '290',
//   SI: '386',
//   SJ: '47',
//   SK: '421',
//   SL: '232',
//   SM: '378',
//   SN: '221',
//   SO: '252',
//   SR: '597',
//   SS: '211',
//   ST: '239',
//   SV: '503',
//   SX: '599',
//   SY: '963',
//   SZ: '268',
//   TC: '+1-649',
//   TD: '235',
//   TF: '',
//   TG: '228',
//   TH: '66',
//   TJ: '992',
//   TK: '690',
//   TL: '670',
//   TM: '993',
//   TN: '216',
//   TO: '676',
//   TR: '90',
//   TT: '+1-868',
//   TV: '688',
//   TW: '886',
//   TZ: '255',
//   UA: '380',
//   UG: '256',
//   UM: '1',
//   US: '1',
//   UY: '598',
//   UZ: '998',
//   VA: '379',
//   VC: '+1-784',
//   VE: '58',
//   VG: '+1-284',
//   VI: '+1-340',
//   VN: '84',
//   VU: '678',
//   WF: '681',
//   WS: '685',
//   XK: '',
//   YE: '967',
//   YT: '262',
//   ZA: '27',
//   ZM: '260',
//   ZW: '263',
// };
