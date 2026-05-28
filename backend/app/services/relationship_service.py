from sqlalchemy.orm import Session

from app.models.character_relationship import CharacterRelationship


class RelationshipService:
    def get_or_create(
        self,
        db: Session,
        telegram_id: str,
        character_slug: str,
    ) -> CharacterRelationship:
        relationship = (
            db.query(CharacterRelationship)
            .filter(
                CharacterRelationship.telegram_id == telegram_id,
                CharacterRelationship.character_slug == character_slug,
            )
            .first()
        )

        if relationship:
            return relationship

        relationship = CharacterRelationship(
            telegram_id=telegram_id,
            character_slug=character_slug,
        )

        db.add(relationship)
        db.commit()
        db.refresh(relationship)

        return relationship

    def add_message_progress(
        self,
        db: Session,
        telegram_id: str,
        character_slug: str,
    ) -> CharacterRelationship:
        relationship = self.get_or_create(
            db=db,
            telegram_id=telegram_id,
            character_slug=character_slug,
        )

        relationship.messages_count += 1
        relationship.xp += 8

        if relationship.trust < 100:
            relationship.trust += 1

        relationship.level = max(1, relationship.xp // 100 + 1)

        if relationship.trust >= 75:
            relationship.mood = "очень близкое"
        elif relationship.trust >= 45:
            relationship.mood = "доверительное"
        elif relationship.trust >= 20:
            relationship.mood = "тёплое"
        else:
            relationship.mood = "новое знакомство"

        db.commit()
        db.refresh(relationship)

        return relationship