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
              .d-none-print{display:none;}
            @page {size: A4;margin: 0;padding: 0px;display: block;}
          }
            @page {size: A4;margin: 0;padding: 0px;display: block;}
            ${styles}
            </style><body className="light"><div className="white-theme"><div className="resume-page">${componentRef.innerHTML}</div></div></body></html>`;
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

  function printElementInIframe(elementId = 'white-theme') {
    // Extract all CSS rules from the parent document
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

    // Create an iframe
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = 'none';

    // Append the iframe to the body
    document.body.appendChild(iframe);

    // Get iframe document
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    // Add a <style> tag to the iframe to include the parent document's styles
    const styleTag = iframeDoc.createElement('style');
    styleTag.textContent = styles;
    iframeDoc.head.appendChild(styleTag);

    // Add the element content to the iframe
    const element = document.getElementById(elementId);
    const iframeContent = iframeDoc.createElement('div');
    iframeContent.innerHTML = `<html><style>@media print {
      #content, #content_image{padding-top: 0px!important;padding-bottom: 0px!important;}
      body.dark, body .white-theme{
        -webkit-print-color-adjust:exact !important;print-color-adjust:exact !important;
        height:100%!important;
        width:100%!important;
        overflow:scroll!important;
      }
        .d-none-print{display:none;}
      @page {size: A4;margin: 0;padding: 0px;display: block;}
          .page {
          padding-bottom: 20px!important;
          clear: both;
          page-break-after: always;
         }
    }

      @page {size: A4;margin: 0;padding: 0px;display: block;}
      ${styles}
      </style><body className="light"><div className="white-theme"><div className="resume-page">${element.innerHTML}</div></div></body></html>`;
    iframeDoc.body.appendChild(iframeContent);

    // Print the iframe content
    iframe.contentWindow.focus();
    iframe.contentWindow.print();

    // Remove the iframe from the DOM after printing
    document.body.removeChild(iframe);
}
  
  return (
    <React.Fragment>
      <div className='white-theme'>
        <div className='resume-page' id='white-theme'>
          <div className={'page'}>
              <Row className='m-0'>
                <Col className='col-6'>
                  <h5>SHRIKANT MERGU</h5>
                  <h6 className='mb-0'>Sr Software Developer</h6>
                </Col>
                <Col className='px-0 pt-2 d-flex flex-column align-items-end col-6'>
                  <table border={0}>
                    <tr>
                      <th>
                        Email:
                      </th>
                      <td align={"right"}>
                        <AnchorLink to={"mailto:shrikantmergu143@gmail.com"} target={"_blank"} >shrikantmergu143@gmail.com</AnchorLink>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        Mobile:
                      </th>
                      <td align={"right"}>
                        <AnchorLink to={"tel:+919028309906"} target >+91-9028309906</AnchorLink>
                      </td>
                    </tr>
                  </table>
                </Col>
                {/* <hr/> */}
                <div className='d-flex justify-content-center pt-2'>
                  {/* <span className={"px-2"}>267/58 Raviwar Peth, Solapur Maharashtra</span> */}
                  <AnchorLink to={'https://www.linkedin.com/in/shrikant-mergu-53962b1a6/'} target={"_blank"} className={"px-2"}>linkedin.com/shrikant-mergu-53962b1a6</AnchorLink>
                  <AnchorLink to={"https://github.com/shrikantmergu143"} target={"_blank"} className={"px-2"}>github.com/shrikantmergu143</AnchorLink>
                  <AnchorLink to={"https://www.instagram.com/_.shrikantmergu3006"} target={"_blank"} className={"px-2"}>instagram.com/_.shrikantmergu3006</AnchorLink>
                </div>
              </Row>
              <hr/>
              <div>
                <h6 className='mb-2 header-title text-center fw-7 text-secondary'>SUMMARY</h6>
                <p>Seasoned Senior React Developer with extensive experience in <b className='fw-5'>React.js</b>, <b className='fw-5'>Express.js</b>, and <b className='fw-5'>Next.js</b>. Proven track record of building high-performance web applications and leading development teams. Expert in creating scalable solutions, optimizing user experiences, and leveraging modern <b className='fw-5'>JavaScript</b> technologies to drive innovation and efficiency.</p>
              </div>
              <hr/>
              <div>
                <h6 className='mb-2 header-title text-center fw-7 text-secondary'>SKILLS</h6>
                <div className='pb-2'>
                  <h6 className='title-2 d-inline fw-7'>Technical Skills:
                    <p className='mb-0 d-inline ps-2 fw-4'>React.js, Next.js, Node.js, Vite.js, PHP, MongoDB, Laravel, Mysqli, HTML, CSS, JavaScript, Material UI, TypeScript.</p>
                  </h6>
                </div>
                <div className='pb-2'>
                  <h6 className='title-2 d-inline fw-7'>Soft Skills:
                    <p className='mb-0 d-inline ps-2 fw-4'>Teamwork, Remote Collaboration, Flexibility, Leadership, Adaptability.</p>
                  </h6>
                </div>
                <div hidden className='pb-2'>
                  <h6 className='title-2 d-inline fw-7'>Languages:
                    <p className='mb-0 d-inline ps-2 fw-4'>English, Hindi, Marathi, Telugu.</p>
                  </h6>
                </div>
              </div>
              <hr/>
              <div>
                <h6 className='mb-2 header-title text-center fw-7 text-secondary'>WORK EXPERIENCE</h6>
                <div className='pb-2'>
                  <div className='d-flex'>
                    <h6 className='title-1'>Jr. PHP Developer | NewSoft Solutions PVT. LTD.</h6>
                    <h6 className='title-1 ms-auto text-secondary mb-0'>OCT/2021 — DEC/2021</h6>
                  </div>
                  <ul>
                    <li>As a PHP developer is responsible for create <b  className='fw-5'>server-side web application</b> logic.</li>
                    <li>Usually develop back-end components, connect the application with the other (often third-party) web services, and support the front-end developers by integrating their work with the application.</li>
                  </ul>
                </div>
                <div className='pb-2'>
                  <div className='d-flex'>
                    <h6 className='title-1'>Sr. Software Developer | Appristine Technologies PVT. LTD.</h6>
                    <h6 className='title-1 ms-auto text-secondary mb-0'>DEC/2021 — Present</h6>
                  </div>
                  <ul className='mb-0'>
                    <li>
                      Contributed to the creation of <b className='fw-5'>reusable functional components</b> with React Hooks, reducing code redundancy and encouraging best practices across the team.
                    </li>
                    <li>
                      Designed and implemented scalable server-side applications with <span className='fw-5'>Express.js</span> and Laravel, ensuring robust <span className='fw-5'>back-end functionality</span> and efficient data handling.
                    </li>
                    <li>
                      Utilized Vite for fast builds and improved front-end performance, integrating with Redux for state management and Inertia for seamless client-server communication.
                    </li>
                    <li>
                      Worked closely with cross-functional teams to define project requirements, <span className='fw-5'> deliverhigh-quality code</span>, and ensure timely project delivery. Participated in the revamp of a <span className='fw-5'>core application feature using Redux</span>, which normalized state shape and reduced state management complexities.
                    </li>
                    <li>
                      Implemented best practices in coding, conducted code reviews, and optimized existing codebase for performance and maintainability.
                    </li>
                  </ul>
                </div>
              </div>
              <hr/>
              <div>
                <h6 className='mb-2 header-title text-center fw-7 text-secondary'>PROJECTS</h6>
                <div className='pb-0'>
                  <h6 className='title-2 d-inline fw-7'>Fellame:
                    <p className='mb-0 d-inline ps-2 fw-5'>Technologies - React.js, Redux, Laravel, Payment Gateway, RozarPay.</p>
                  </h6>
                  <div>
                    <ul>
                      <li>Developed an online shopping platform for printed fabric T-Shirts with various colors and sizes.</li>
                      <li>Implemented online payment integration for order processing using RozarPay.</li>
                      <li>Enabled coupon application and instant order placement for users.</li>
                      <li>Integrated OTP-based user login for enhanced security.</li>
                    </ul>
                  </div>
                </div>
                <div className='pb-2'>
                  <h6 className='title-2 d-inline fw-7'>CareTraings:
                    <p className='mb-0 d-inline ps-2 fw-5'>Technologies - Next.js, Express.js, React.js, WebSocket, Redux, MongoDB.</p>
                  </h6>
                  <div>
                    <ul className='mb-0'>
                      <li>Led front-end development using React.js and back-end with Node.js (Express.js).</li>
                      <li>Created features for course management, progress tracking, and interactive learning modules.</li>
                      <li>Utilized Next.js for server-side rendering to improve application performance and SEO.</li>
                      <li>Applied Redux for effective state management.</li>
                    </ul>
                  </div>
                </div>
                <div className='pb-0'>
                  <h6 className='title-2 d-inline fw-7'>Girne:
                    <p className='mb-0 d-inline ps-2 fw-5'>Technologies - React.js, Redux, Payment Gateway.</p>
                  </h6>
                  <div>
                    <ul className='mb-0'>
                      <li>Developed an online marketplace platform in Turkey connecting buyers and sellers.</li>
                      <li>Implemented payment gateway for secure transactions.</li>
                      <li>Utilized React.js and Redux for robust front-end development and state management.</li>
                    </ul>
                  </div>
                </div>
              </div>
              <hr/>
              <div>
                <h6 className='mb-2 header-title text-center fw-7 text-secondary'>EDUCATION</h6>
                <div className='pb-2'>
                  <div className='d-flex'>
                    <h6 className='title-1'>Master of Computer Application<span className='ms-1 fw-5 text-secondary-1'>| Percentage - 60.20%</span></h6>
                    <h6 className='title-1 ms-auto text-secondary mb-0'>DEC/2021 — APR/2024</h6>
                  </div>
                  <h6 className='title-2 text-secondary'>Punyashlok Ahilyadevi Holkar University, Solapur</h6>
                </div>
                <div className='pb-2'>
                  <div className='d-flex'>
                    <h6 className='title-1'>Bachelor of Computer Application<span className='ms-1 fw-5 text-secondary-1'>| Percentage - 67.53%</span></h6>
                    <h6 className='title-1 ms-auto text-secondary mb-0'>JUN/2018 — MAR/2021</h6>
                  </div>
                  <h6 className='title-2 text-secondary'>Hirachand Nemchand College of Commerce, Solapur</h6>
                </div>
              </div>
            <hr className='pt-5'/>
              <div>
                <h6 className='mb-2 header-title text-center fw-7 text-secondary'>CERTIFICATE</h6>
                <div className='pb-2'>
                  <ul>
                    <li className='fw-5 fs-14'><b>Udemy - </b>Practical Web Design & Development: 7 Courses in 1</li>
                    <li className='fw-5 fs-14'><b>Udemy - </b>Python Programming with Data Science</li>
                    <li className='fw-5 fs-14'><b>Spoken Tutorial - </b>C Training</li>
                  </ul>
                </div>
              </div>
          </div>
        </div>
        <Button className={"d-none-print"} onClick={()=>printElementInIframe("white-theme")}>Download</Button>
      </div>
    </React.Fragment>
  )
}
