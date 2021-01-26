import TestsService from '../services/testsService';

const testsReducer = ()=>{
  return TestsService.getAllTests();
}

export default testsReducer;