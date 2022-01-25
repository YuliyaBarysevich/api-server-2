'use strict'

const mongoose = require('mongoose');

const partnersSchema = mongoose.Schema({
  dealerType: { type: String, default: "1" },
  firstName: {type: String, required: true },
  lastName: {type: String, required: true },
  businessName: {type: String, required: true },
  website: {type: String, required: true },
  phone1: {type: String, required: true },
  phone2: {type: String},
  email1: {type: String, required: true },
  email2: {type: String},
  address: {type: String, required: true },
  city: {type: String, required: true },
  state: {type: String, required: true },
  zip: {type: String, required: true },
  orderHandlingEdi: { type: String}, 
  orderHandlingEdiContactPerson: { type: String},
  orderHandlingEdiPhone: { type: String},
  orderHandlingEdiEmail: { type: String},
  orderHandlingPortal: { type: String},
  orderHandlingPortalContactPerson: { type: String},
  orderHandlingPortalPhone: { type: String},
  orderHandlingPortalEmail: { type: String},
  orderHandlingPortalUrl: { type: String},
  orderHandlingManual: { type: String},
  orderHandlingManualTextArea: { type: String},
  marketPlaceEbay: {type: String},
  marketPlaceAmazon: {type: String},
  marketPlaceWalmart: {type: String},
  marketPlaceOther: {type: String},
  marketPlaceName1: {type: String},
  marketPlaceName2: {type: String},
  marketPlaceName3: {type: String},
  hasStore: {type: String},
  storeAddress: {type: String},
  retailWebsite: {type: String},
  retailsCertificateNumber: {type: String},
  taxId: {type: String},
  insuranceNumber: {type: String},
  retailsCertificateNumberFile: {type: String},
  taxDocumentNumberFile: {type: String},
  insuranceCertificateNumberFile: {type: String}
});

const partnersModel = mongoose.model('partners', partnersSchema);

module.exports = partnersModel;