import { Fragment, h } from 'preact';
import { useState } from 'preact/hooks';
import { useDrop } from 'react-dnd';
import { PetCard } from './Pet';

const PETS = [
  { id: 1, name: 'dog' },
  { id: 2, name: 'cat' },
  { id: 3, name: 'fish' },
  { id: 4, name: 'hamster' },
];

export const Basket = () => {
  const [basket, setBasket] = useState([]);
  const [{ isOver }, dropRef] = useDrop({
    accept: 'pet',
    drop: (item) =>
      setBasket((basket) =>
        !basket.includes(item) ? [...basket, item] : basket
      ),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <Fragment>
      <div className="pets">
        {PETS.map((pet) => (
          <PetCard key={pet.id} draggable id={pet.id} name={pet.name} />
        ))}
      </div>
      <div
        style={{ width: '200px', height: '200px', border: '1px solid black' }}
        className="basket"
        ref={dropRef}
      >
        {basket.map((pet) => (
          <PetCard key={pet.id} id={pet.id} name={pet.name} />
        ))}
        Pets go in this basket
        {isOver && <div>Your close. Drop here</div>}
      </div>
    </Fragment>
  );
};
