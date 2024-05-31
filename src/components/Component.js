import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchData } from './actions';

const Component = ({ data, fetchData }) => {
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {/* Render your data here */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { fetchData })(Component);