import { Schema, model } from 'mongoose';

const CarMaintenancesSchema = new Schema({
  action: String,
  carId: Number,
  carTypeId: Number,
  createdAt: String,
  updatedAt: Date,
});

export const CarMaintenances = model('carMaintenances', CarMaintenancesSchema);
