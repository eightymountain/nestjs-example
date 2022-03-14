export interface MapConfig {
  width: number;
  height: number;
  gridWidth: number;
  gridHeight: number;
  cmPerGrid: number;
  matrix: Array<number[]> | null;
}
