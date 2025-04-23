export interface PlayerScores {
  puyu: number;
  jindian: number;
  zifei: number;
  yuting: number;
  shuyu: number;
  [key: string]: number;
}

export interface ColorMaps {
  puyu: Record<string, string>;
  jindian: Record<string, string>;
  zifei: Record<string, string>;
  yuting: Record<string, string>;
  shuyu: Record<string, string>;
  [key: string]: Record<string, string>;
}

export interface StateCount {
  puyu: Record<string, number>;
  jindian: Record<string, number>;
  zifei: Record<string, number>;
  yuting: Record<string, number>;
  shuyu: Record<string, number>;
  [key: string]: Record<string, number>;
} 