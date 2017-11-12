class Cat():
  legs = 4
  eyes = 2
  nose = 1

class KoreanShortHair(Cat):
  legs = 3
  breed = 'british'
  name = 'nabi'

KoreanShortHair.legs  # 3
KoreanShortHair.eyes  # 2
KoreanShortHair.breed # british
Cat.breed             # error
