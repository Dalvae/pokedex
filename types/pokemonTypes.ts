export interface TypeRelation {
    name: string;
    url: string;
  }
  
  export interface DamageRelation {
    double_damage_from: TypeRelation[];
  }
  
  export interface TypeData {
    damage_relations: DamageRelation;
  }
  
  export interface PokemonType {
    type: {
      name: string;
      url: string;
    };
  }
  
  export interface PokemonData {
    name: string;
    id: number;
    weight: number;
    height: number;
    base_experience: number;
    types:string[];
    sprite: string; 
    description: string;
    category: string;
    stats:string[];
    weaknesses: string[];
    species: {
      url: string;
    };
  }
  

  export interface SimplePokemonDetails {
    id: number;
    name: string;
    url: string;
    types: string[];
    sprite: string; 
  }
  