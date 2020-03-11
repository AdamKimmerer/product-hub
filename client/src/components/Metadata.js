import React from 'react';

import PageTitle from './PageTitle.js';

export default class MetaData extends React.Component {
  constructor(props) {
    super(props)
  }
  
  handleToggle = () => {
    this.props.toggleMetaHandler();
  }
  
  render() {    
    return(
      <div className="metadata-cont">
        <div className="metadata-main">
          <div className="closeMeta" onClick={this.handleToggle}>
            X
          </div>
          <PageTitle
            type="metadata"
            name={this.props.indicator.Name}
          />
          <div className="metadata-items">
            <div className="meta-item">
              <span className="title">Description1:</span>
              <br/>
              <span className="meta-body">This indicator looks at how many long-term care residents are in daily physical restraints. Restraints are sometimes used to manage behaviours or to prevent falls. There are many potential physical and psychological risks associated with applying physical restraints to older adults, and such use raises concerns about safety and quality of care.

              </span>
            </div>
            <div className="meta-item">
              <span className="title">Denominator:</span>
              <br/>
              <span className="meta-body">
                Description:
Residents with valid assessments<br/>
Inclusions:<br/>
1. Residents with valid assessments. To be considered valid, the target assessment must
<br/>
a. Be the latest assessment in the quarter
<br/>
b. Be carried out more than 92 days after the Admission Date
<br/>
c. Not be an Admission Full Assessment<br/>
Exclusions:<br/>
1. Residents who are comatose (B1 = 1) or quadriplegic (I1bb = 1)"
              </span>
            </div>
            <div className="meta-item">
              <span className="title">Rationale
:</span>
              <br/>
              <span className="meta-body">"Description:

Residents who were physically restrained daily on their target assessment. For this indicator, restraints included

– Trunk Restraint (P4c = 2)

– Limb Restraint (P4d = 2)

– Chair Prevents Rising (P4e = 2)

Inclusions:

1. Residents with valid assessments. To be considered valid, the target assessment must

a.  Be the latest assessment in the quarter

b. Be carried out more than 92 days after the Admission Date

c. Not be an Admission Full Assessment

Exclusions:

1. Residents who are comatose (B1 = 1) or quadriplegic (I1bb = 1)"
</span>
            </div>
            <div className="meta-item">
              <span className="title">Interpretation
:</span>
              <br/>
              <span className="meta-body">Lower is better. It means that a lower percentage of long-term care residents were in daily physical restraints.
</span>
            </div>
            <div className="meta-item">
              <span className="title">References
:</span>
              <br/>
              <span className="meta-body"><p>Canadian Institute for Health Information. <em><a href="https://www.cihi.ca/en/ccrs_qi_risk_adj_meth_2013_en.pdf" rel="nofollow" target="_blank">CCRS Quality Indicators Risk Adjustment Methodology</a></em>. 2013.</p>

<p>Canadian Institute for Health Information. <em><a href="https://secure.cihi.ca/free_products/CCRS_QualityinLongTermCare_EN.pdf" rel="nofollow" target="_blank">When a Nursing Home Is Home: How Do Canadian Nursing Homes Measure Up on Quality?</a></em> 2013.</p>

<p>Health Quality Ontario. <em><a href="http://www.hqontario.ca/Portals/0/Documents/pr/pr-ltc-benchmarking-resource-guide-en.pdf" rel="nofollow" target="_blank">Long-Term Care Benchmarking Resource Guide</a></em>. 2013.</p>

<p>Health Quality Ontario. <em><a href="http://www.hqontario.ca/Portals/0/documents/system-performance/benchmark-setting-ltc-indicators-feb-2017-en.pdf" rel="nofollow" target="_blank">Results From Health Quality Ontario’s Benchmark Setting for Long-Term Care Indicators</a></em>. 2017.</p>

<p>Health Quality Ontario. <a href="http://indicatorlibrary.hqontario.ca/Indicator/Search/EN" rel="nofollow" target="_blank">Health Quality Ontario Indicator Library</a>. Accessed October 4, 2017.</p>
</span>
            </div>
            <div className="meta-item">
              <span className="title">Data Sources:</span>
              <br/>
              <span className="meta-body">NACRS
</span>
            </div>
            <div className="meta-item">
              <span className="title">Available Data Years:</span>
              <br/>
              <span className="meta-body">Type of Year: Fiscal<br/>First Available Year: 2010<br/>Last Available Year: 2017</span>
            </div>
            <div className="meta-item">
              <span className="title">Update Frequency:</span>
              <br/>
              <span className="meta-body">Every year
</span>
            </div>
            <div className="meta-item">
              <span className="title">Updates:</span>
              <br/>
              <span className="meta-body">Not applicable
</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}