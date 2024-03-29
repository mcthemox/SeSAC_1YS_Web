import { useSelector } from 'react-redux';
import styled from 'styled-components';
import SkyblueButton from './SkyblueButton';
import { useDispatch } from 'react-redux';
import { next } from '../store/modules/mbti';

export default function Mbti() {
  const survey = useSelector((state) => state.mbti.survey);
  const page = useSelector((state) => state.mbti.page);
  const dispatch = useDispatch();

  const SurveyQuestion = styled.p`
    font-size: 1.5em;
    color: #777;
  `;
  const Vs = styled.p`
    font-size: 2em;
    padding-top: 1em;
  `;
  return (
    <>
      <SurveyQuestion>{survey[page - 1].question}</SurveyQuestion>
      <ul>
        {survey[page - 1].answer.map((el, index) => {
          return (
            <li key={index}>
              <SkyblueButton
                text={el.text}
                clickEvent={() => {
                  dispatch(next());
                }}
              />
              {index === 0 && <Vs>VS</Vs>}
            </li>
          );
        })}
      </ul>
    </>
  );
}
