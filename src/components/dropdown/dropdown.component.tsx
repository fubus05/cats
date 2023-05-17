import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../store/store';
import { toggleDropdown, selectOption } from '../../store/dropdown/dropdown.slice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

interface IOptions{
    id:    string;
    label: string;
}

interface IDropdownProps{
    options?: IOptions[];
}

export const Dropdown = (props: IDropdownProps) => {
  const { options } = props;
  const dispatch = useDispatch<AppDispatch>()
  const { isOpen, selectedOption } = useSelector((state:any) => state.dropdown);

  return (
      <div className="dropdown">
        <div
          onClick={(e) => {
            dispatch(toggleDropdown());
          }}
          className="dropdown-btn"
        >
          {selectedOption}
          <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
        </div>
        <div
          className="dropdown-content"
          style={{ display: isOpen ? "block" : "none" }}
        >
            {options?.map((option: any) => (
                <div key={option.value} onClick={() => dispatch(selectOption({label: option.label, id: option.id}))} className="item">
                    {option.label}
                </div>
            ))}
        </div>
      </div>
  );
}
