# frozen_string_literal: true

json.total_records @statements.total_entries
json.statements @statements do |statement|
  json.extract! statement, :id, :performed_at, :cost, :merchant, :card_last4, :status
  json.user statement.card.user.name if statement.card.present?
  json.category statement.category.name if statement.category.present?
  json.file rails_blob_url(statement.file) if statement.file.attached?
end
