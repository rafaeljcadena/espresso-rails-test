json.array! @cards do |card|
  json.extract! card, :id, :last4
  json.user_name card.user.name
end