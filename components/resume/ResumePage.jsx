import React from 'react'
import Button from '../common/Button';
import { Col, Row } from 'react-bootstrap';
import Link from 'next/link';
import AnchorLink from '../common/AnchorLink';

export default function ResumePage() {
  const generateAndDownloadPdf = async () => {
    try {
      const styles = Array.from(document.styleSheets)
      .map(styleSheet => {
          try {
            return Array.from(styleSheet.cssRules)
              .map(rule => rule.cssText)
              .join('\n');
          } catch (e) {
            console.warn('Cannot read cssRules from stylesheet:', e);
          return '';
          }
      })
      .filter(Boolean)
      .join('\n');
        const componentRef = document.getElementById("white-theme")
        const htmlContent = `<html><style>@media print {
            #content, #content_image{padding-top: 0px!important;padding-bottom: 0px!important;}
            body{
              -webkit-print-color-adjust:exact !important;print-color-adjust:exact !important;
            }
            @page {size: A4;margin: 0;padding: 0px;display: block;}
          }
            @page {size: A4;margin: 0;padding: 0px;display: block;}
            ${styles}
            </style><body class="light"><div class="white-theme"><div class="resume-page">${componentRef.innerHTML}</div></div></body></html>`;
        const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ htmlContent })
        });
        const pdfBlob = await response.blob();
        const url = window.URL.createObjectURL(pdfBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'example.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error generating PDF:', error);
    }
  };
  
  return (
    <React.Fragment>
      <div className='white-theme'>
        <div className='resume-page' id='white-theme'>
          <page className={'page'}>
              <Row className='m-0'>
                <Col className='p-0 col-6'>
                  <h5>SHRIKANT MERGU</h5>
                  <AnchorLink to={'https://www.linkedin.com/in/shrikant-mergu-53962b1a6/'} target={"_blank"} className={"d-block"}>linkedin.com/shrikant-mergu-53962b1a6</AnchorLink>
                  <AnchorLink to={"https://github.com/shrikantmergu143"} target={"_blank"} className={"d-block"}>github.com/shrikantmergu143</AnchorLink>
                </Col>
                <Col className='px-0 pt-2 d-flex flex-column align-items-end col-6'>
                  <table border={0}>
                    <tr>
                      <th>
                        Email:
                      </th>
                      <td>
                        <AnchorLink to={"mailto:shrikantmergu123@gmail.com"} target={"_blank"} >shrikantmergu123@gmail.com</AnchorLink>
                      </td>
                    </tr>
                    <tr>
                      <th>
                      Mobile:
                      </th>
                      <td>
                        <AnchorLink to={"tel:+919028309906"} target >+91-9028309906</AnchorLink>
                      </td>
                    </tr>
                  </table>
                </Col>
              </Row>
          </page>
        </div>
        <Button onClick={generateAndDownloadPdf}>Download</Button>
      </div>
    </React.Fragment>
  )
}
