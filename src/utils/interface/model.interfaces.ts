export interface models {
  brand_id: number;
  name: string;
  launch_year?: number;
}

export interface updateModel {
  model_id: number;
  brand_id?: number;
  name?: string;
  launch_year?: number;
}
