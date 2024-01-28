import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { PagesCatMenus, PageAltCatMenus } from "../collections/pagesMenus";
import { Link } from "react-router-dom";

const AccordionMenu = () => {
  const newAnaCat = PagesCatMenus.filter((item) => item.CatChild > 0);
  const newAnaCat2 = PagesCatMenus.filter((item) => item.CatChild < 1);

  return (
    <section>
      <Accordion defaultActiveKey={["0"]} alwaysOpen>
        {newAnaCat.map((item) => {
          return (
            <Accordion.Item eventKey={item.id} key={item.id}>
              <Accordion.Header>
                <span className="accordion-header-item">
                  {item.icon}
                  {item.name}
                </span>
              </Accordion.Header>

              <Accordion.Body>
                {PageAltCatMenus.map((item2) => {
                  return (
                    <div key={item2.id}>
                      {item.name === item2.cat ? (
                        <Link to={item2.url}>-- {item2.name}</Link>
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })}
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
      {newAnaCat2.map((item) => {
        return (
          <div key={item.id}>
            <Link to={item.url}>
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </Link>
          </div>
        );
      })}
    </section>
  );
};

export default AccordionMenu;
