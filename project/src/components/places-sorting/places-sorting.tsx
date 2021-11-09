import { useDispatch, useSelector } from 'react-redux';
import { changeSorting } from '../../store/main/main';
import { Sorting } from '../../const';
import { getSorting } from '../../store/main/selectors';
import { getEnumValues } from '../../utils/utils';
import { memo, useState, useRef, MutableRefObject } from 'react';

function PlacesSorting (): JSX.Element {
  const dispatch = useDispatch();
  const currentSorting = useSelector(getSorting);
  const [isOpened, setIsOpened] = useState(false);
  const sortingRef = useRef(null);
  const sortingVariants = getEnumValues(Sorting);

  function onSortVariantClick(variant: Sorting, sortingElement: MutableRefObject<HTMLElement | null>) {
    dispatch(changeSorting(variant));
    setIsOpened(false);

    if (sortingElement.current) {
      sortingElement.current.focus();
    }
  }

  function renderSortingVariants() {
    return sortingVariants.map((variant) => (
      <li
        key={variant}
        className={`places__option ${variant === currentSorting ? 'places__option--active' : ''}`}
        tabIndex={0}
        onClick={() => onSortVariantClick(variant, sortingRef)}
        onKeyDown={(evt) => evt.key === 'Enter' ? onSortVariantClick(variant, sortingRef) : false}
      >
        {variant}
      </li>
    ));
  }

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpened(!isOpened)}
        onKeyDown={(evt) => evt.key === 'Enter' ? setIsOpened(!isOpened) : false}
        ref={sortingRef}
      >
        {currentSorting}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpened ? 'places__options--opened' : ''}`}>
        {renderSortingVariants()}
      </ul>
    </form>
  );
}

export default memo(PlacesSorting);
