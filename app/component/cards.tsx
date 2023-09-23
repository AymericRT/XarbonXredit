"use client";
import { Button, Modal } from "flowbite-react";
import Image from "next/image";
import { useState } from "react";
interface UN_SDGs {
  goal1NoPoverty: string;
  goal2ZeroHunger: string;
  goal3GoodHealthAndWellBeing: string;
  goal4QualityEducation: string;
  goal5GenderEquality: string;
  goal6CleanWaterAndSanitation: string;
  goal7AffordableAndCleanEnergy: string;
  goal8DecentWorkAndEconomicGrowth: string;
  goal9IndustryInnovationAndInfrastructure: string;
  goal10ReducedInequality: string;
  goal11SustainableCitiesAndCommunities: string;
  goal12ResponsibleConsumptionAndProduction: string;
  goal13ClimateAction: string;
  goal14LifeBelowWater: string;
  goal15LifeOnLand: string;
  goal16PeaceAndJusticeStrongInstitutions: string;
  goal17PartnershipsToAchieveTheGoal: string;
}

interface CompanyData {
  imageUrl: string;
  companyName: string;
  description: string;
  unSDGs: UN_SDGs;
}

interface CardProps {
  cardData: CompanyData;
}

export default function Cards({ cardData }: CardProps) {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };
  return (
    <div className="drop-shadow-lg mx-auto">
      <div className="flex flex-col max-w-[300px] h-full rounded-2xl bg-[#00aae4] p-2">
        {/* Image */}
        <div className="flex rounded-t-2xl mb-2">
          <Image
            src={cardData.imageUrl}
            width={300}
            height={300}
            alt="RareSkills Logo"
            className="rounded-2xl"
          />
        </div>
        <div className="flex flex-col justify-between h-full">
          <h2 className="flex text-2xl font-semibold">
            {cardData.companyName}
          </h2>
          <p className="flex">{cardData.description}</p>

          <Button className="bg-[#006097]" onClick={() => props.setOpenModal("dismissible")}>
            Read more
          </Button>
          <Modal
            dismissible
            show={props.openModal === "dismissible"}
            onClose={() => props.setOpenModal(undefined)}
          >
            <Modal.Header>{cardData.companyName}</Modal.Header>
            <Modal.Body>
              <div className="space-y-6">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  {cardData.description}
                </p>

                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Goal 1: No Poverty - {cardData.unSDGs.goal1NoPoverty}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Goal 2: Zero Hunger - {cardData.unSDGs.goal2ZeroHunger}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Goal 3: Good Health and Well-being -{" "}
                  {cardData.unSDGs.goal3GoodHealthAndWellBeing}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Goal 4: Quality Education -{" "}
                  {cardData.unSDGs.goal4QualityEducation}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Goal 5: Gender Equality -{" "}
                  {cardData.unSDGs.goal5GenderEquality}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Goal 6: Clean Water and Sanitation -{" "}
                  {cardData.unSDGs.goal6CleanWaterAndSanitation}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Goal 7: Affordable and Clean Energy -{" "}
                  {cardData.unSDGs.goal7AffordableAndCleanEnergy}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Goal 8: Decent Work and Economic Growth -{" "}
                  {cardData.unSDGs.goal8DecentWorkAndEconomicGrowth}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Goal 9: Industry, Innovation, and Infrastructure -{" "}
                  {cardData.unSDGs.goal9IndustryInnovationAndInfrastructure}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Goal 10: Reduced Inequality -{" "}
                  {cardData.unSDGs.goal10ReducedInequality}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Goal 11: Sustainable Cities and Communities -{" "}
                  {cardData.unSDGs.goal11SustainableCitiesAndCommunities}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Goal 12: Responsible Consumption and Production -{" "}
                  {cardData.unSDGs.goal12ResponsibleConsumptionAndProduction}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Goal 13: Climate Action -{" "}
                  {cardData.unSDGs.goal13ClimateAction}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Goal 14: Life Below Water -{" "}
                  {cardData.unSDGs.goal14LifeBelowWater}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Goal 15: Life on Land - {cardData.unSDGs.goal15LifeOnLand}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Goal 16: Peace and Justice Strong Institutions -{" "}
                  {cardData.unSDGs.goal16PeaceAndJusticeStrongInstitutions}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Goal 17: Partnerships to achieve the Goal -{" "}
                  {cardData.unSDGs.goal17PartnershipsToAchieveTheGoal}
                </p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => props.setOpenModal(undefined)}>
                Agree
              </Button>
              <Button
                color="gray"
                onClick={() => props.setOpenModal(undefined)}
              >
                Disagree
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}
